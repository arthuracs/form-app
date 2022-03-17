import React from 'react'
import countries from "i18n-iso-countries"
import enLocale from "i18n-iso-countries/langs/en.json"
import Input from './Input/Input';

function getSortedCountryList() {
    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", { select: "official" });
    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            code: key
        }
    })
    const sortedCountryArr = countryArr.sort((a, b) => {
        return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
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
            <button
                className="btn" 
                onClick={onReset}
            >
                Reset
            </button>
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
                    <React.Fragment>
                        <label htmlFor={id} className="input-label">
                            {label}
                        </label>
                        <Input id={id} inputValue={this.state.form[id]} onChange={this.handleChange} />
                    </React.Fragment>
                ))
                }

                <label htmlFor="country" className="input-label">
                    Country
                </label>
                <select 
                    name="country"
                    id="country"
                    value={this.state.form.country} 
                    onChange={this.handleChange} 
                >
                    <option key="none" value="" disabled>Select a country...</option>
                    { this.countryArr.map(({ label, code }) => (
                        <option key={code} value={code}>{label}</option>
                    ))}
                </select>
                <div className="radio-group">
                    <div className="radio-group-label">
                        Cats or dogs?
                    </div>
                    <div className="radio-input">
                        <label htmlFor="petPrefCats" className="radio-label">
                            Cats
                        </label>
                        <input
                            name="petPref"
                            id="petPrefCats"
                            type="radio"
                            value="cats"
                            checked={this.state.form.petPref === "cats"}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="radio-input">
                        <label htmlFor="petPrefDogs" className="radio-label">
                            Dogs
                        </label>
                        <input
                            name="petPref"
                            id="petPrefDogs"
                            type="radio"
                            value="dogs"
                            checked={this.state.form.petPref === "dogs"}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="checkbox">
                    <input
                        name="willLearn"
                        id="willLearn"
                        type="checkbox"
                        checked={this.state.form.willLearn}
                        onChange={this.handleChange} 
                    />
                    <label htmlFor="willLearn" className="checkbox-label">
                        I promise I'll keep learning ;)
                    </label>
                </div>
                <button
                    className="btn" 
                    type="submit" 
                    disabled={Object.values(this.state.form).every(x => x === '' || x === null || x === false)}>
                    Submit
                </button>
            </form>
        )
    }
}