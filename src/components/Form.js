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

export default function Form() {
    const initialFormState = {
        fullName: '',
        email: '',
        phone: '',
        country: '',
        petPref: '',
        willLearn: false
    }
    const [form, setForm] = React.useState(initialFormState);
    const [submitted, setSubmitted] = React.useState(false);
    const countryArr = getSortedCountryList();
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        setSubmitted(true);
    }
    const handleReset = () => {
        setForm(initialFormState);
        setSubmitted(false);
    }
    
    if (submitted === true) {
        return <Results response={form} onReset={handleReset} />
    }

    const inputFields = {
        fullName: "Full name",
        email: "E-mail",
        phone: "Phone"
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            
            { Object.entries(inputFields).map(([id, label]) => (
                <React.Fragment key={id}>
                    <Label forId={id}>
                        {label}
                    </Label>
                    <Input 
                        id={id}
                        inputValue={form[id]} 
                        onChange={handleChange} 
                    />
                </React.Fragment>
            ))
            }

            <Label forId="country">
                Country
            </Label>
            <Select 
                id="country" 
                inputValue={form.country} 
                onChange={handleChange} 
                options={countryArr} 
                placeholder="Select a country..."
            />

            <Radio
                id="petPref"
                inputValue={form.petPref}
                onChange={handleChange}
                options={["Cats", "Dogs"]}
            >
                Cats or dogs?
            </Radio>

            <Checkbox 
                id="willLearn"
                checked={form.willLearn}
                onChange={handleChange}
            >
                I promise I'll keep learning ;)
            </Checkbox>

            <Button 
                label="Submit"
                click={handleSubmit}
                type="primary" 
                disabled={Object.values(form).every(x => x === '' || x === null || x === false)} 
            />

        </form>
    )
}