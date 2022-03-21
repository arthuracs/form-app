import React from 'react'
import countries from "i18n-iso-countries"
import enLocale from "i18n-iso-countries/langs/en.json"
import Input from './Input/Input';
import Select from './Select/Select';
import Checkbox from './Checkbox/Checkbox';
import Button from './Button/Button';
import Radio from './Radio/Radio';
import Label from './Label/Label';

function getSortedCountryList() {
    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", { select: "official" });
    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            key: key,
            value: value
        }
    })
    const sortedCountryArr = countryArr.sort((a, b) => {
        return a.value.toLowerCase().localeCompare(b.value.toLowerCase());
    })
    return sortedCountryArr;
}

function Results({response, onReset}) {
    return (
        <div>
            Thanks, we received the following:
            <ul>
                {Object.entries(response).map(([field, value]) => {
                    return (
                        <li key={field}><b>{field}</b>: {`${value}`}</li>
                    )
                })}
            </ul>
            <Button 
                label="Reset"
                click={onReset} 
                type="outside"
            />
        </div>
    )
}

export default class Form extends React.Component {
    constructor(props) {
        super(props)

        this.initialFormState = {
            fullName: '',
            email: '',
            phone: '',
            country: '',
            petPref: '',
            willLearn: false
        }

        this.state = {
            form: this.initialFormState,
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
        
        this.countryArr = getSortedCountryList();

    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(({form}) => ({
            form: {
                ...form,
                [name]: value
            }
        }))
    }
    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            submitted: true
        })
    }
    handleReset() {
        this.setState({
            form: this.initialFormState,
            submitted: false
        })
    }
    render() {

        if (this.state.submitted === true) {
            return <Results response={this.state.form} onReset={() => this.handleReset()} />
        }

        const inputFields = {
            fullName: "Full name",
            email: "E-mail",
            phone: "Phone"
        };
        
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                
                { Object.entries(inputFields).map(([id, label]) => (
                    <React.Fragment key={id}>
                        <Label forId={id}>
                            {label}
                        </Label>
                        <Input 
                            id={id}
                            inputValue={this.state.form[id]} 
                            onChange={this.handleChange} 
                        />
                    </React.Fragment>
                ))
                }

                <Label forId="country">
                    Country
                </Label>
                <Select 
                    id="country" 
                    inputValue={this.state.form.country} 
                    onChange={this.handleChange} 
                    options={this.countryArr} 
                    placeholder="Select a country..."
                />

                <Radio
                    id="petPref"
                    inputValue={this.state.form.petPref}
                    onChange={this.handleChange}
                    options={["Cats", "Dogs"]}
                >
                    Cats or dogs?
                </Radio>

                <Checkbox 
                    id="willLearn"
                    checked={this.state.form.willLearn}
                    onChange={this.handleChange}
                >
                    I promise I'll keep learning ;)
                </Checkbox>

                <Button 
                    label="Submit"
                    click={this.onSubmit}
                    type="primary" 
                    disabled={Object.values(this.state.form).every(x => x === '' || x === null || x === false)} 
                />

            </form>
        )
    }
}