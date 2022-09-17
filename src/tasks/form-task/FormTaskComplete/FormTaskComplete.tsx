import React from 'react';
import { useState, useEffect } from 'react';
import { Type_SubmitData } from './@form-types';


export const FormTaskComplete = ({saveUserForm}: {saveUserForm: (submitData: Type_SubmitData)=>Promise<void>}) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [userType, setUserType] = useState('Active');
    const [inActivityDate, setInActivityDate] = useState('');     

    const [b_firstname, setBfirstname] = useState(false);
    const [b_lastname, setBlastname] = useState(false);
    const [b_BirthDay, setBBirthDay] = useState(' ');
    const [b_InActivityDate, setBInActivityDate] = useState(' ');

    useEffect(() => {
        setBfirstname(firstname !== '');
        setBlastname(lastname !== '');
    }, [firstname, lastname, birthDay, userType, inActivityDate]);

    const dateFormatCheck = (dateStr: string) => {
        // Format Check : YYYY-MM-DD
        let date_regex = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/ ;
        if(!date_regex.test(dateStr)) {
            return "Date value must have the format YYYY-MM-DD";
        }
        // Valid Check (Leap Year)
        let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let dates = dateStr.split('-');
        let year = parseInt(dates[0]);
        let month = parseInt(dates[1]);
        let day = parseInt(dates[2]);
        if((year%100==0) ? (year%400==0) : (year %4==0)){
            months[1] = 29;
        }
        if(months[month-1]<day){
            return "Invalid Date.";
        }
        // Last Day Check.
        if(new Date()< new Date(dateStr)){
            return "Please input the past date.";
        }
        return '';
    } 
    const handleBirthDayInput = (dateStr:string) => {
        setBBirthDay(dateFormatCheck(dateStr));
        setBirthDay(dateStr);
    }
    const handleInActiveDate = (dateStr: string) => {
        setBInActivityDate(dateFormatCheck(dateStr));
        setInActivityDate(dateStr);
    }
    const handleSubmit = () => {
        // Validation
        console.log(b_firstname, b_lastname, b_BirthDay, userType, b_InActivityDate)
        if(!b_firstname || !b_lastname || b_BirthDay!='' || (userType=='InActive' && b_InActivityDate!='')){
            console.log("Input all fields correctly.");
            return;
        }
        saveUserForm({firstname, lastname, birthDay, userType, inActivityDate});
    }

    return (
    <div>
        <h3>Personal Info</h3>
        <div className="row">
            <div className="col">
                <div className="form-outline">
                    <label htmlFor='First name' className="form-label">
                        First name
                        <sup className="text-danger fs-8">*</sup>
                    </label>                    

                    <input type="text" className="form-control" placeholder='John'
                        id='First name'
                        onChange={(e)=>setFirstname(e.target.value)}
                        value={firstname}
                    />
                    {
                        !b_firstname &&
                        <label className="form-label text-danger fs-8">
                            This is mandetary field.
                        </label>
                    }
                </div>
            </div>
            <div className="col">
                <div className="form-outline">
                    <label className="form-label" htmlFor='Last name'>
                        Last name
                        <sup className="text-danger fs-8">*</sup>
                    </label>
                    <input type="text" className="form-control" placeholder='Doe'
                        id="Last name"
                        onChange={(e)=>setLastname(e.target.value)}
                        value={lastname}
                    />
                    {
                        !b_lastname &&
                        <label className="form-label text-danger fs-8">
                            Please, input your lastname.
                        </label>
                    }
                </div>
            </div>
        </div>

        <div className='row '>
            <div className="form-outline col-sm-6">
                <label className="form-label" htmlFor='birthday'>Birthday</label>
                <input type="text" className="form-control" placeholder='YYYY-MM-DD'
                    id='birthday'
                    onChange={(e)=>handleBirthDayInput(e.target.value)}
                />
                <label className="form-label text-danger fs-8">
                    {b_BirthDay}
                </label>
            </div>
            <hr />
        </div>

        <h3>User Management</h3>
        <div className="row">
            <div className="col-sm-6">
                    <label className="form-label" htmlFor='User Type'>User Type</label>
                    <select className="form-select" placeholder='John'
                        id='User Type'
                        onChange={(e)=>setUserType(e.target.value)}
                    >
                        <option>Active</option>
                        <option>InActive</option>
                    </select>                   
                </div>
        </div>

        <div className='row '>
            <div className="form-outline mt-3 col-sm-6">
                <label className="form-label" htmlFor='User Inactivity Date'>User Inactivity Date</label>
                <input type="email" className="form-control" placeholder='YYYY-MM-DD' 
                    id='User Inactivity Date'
                    disabled={userType=='Active'}
                    onChange={(e)=>handleInActiveDate(e.target.value)}
                />
                <label className="form-label text-danger fs-8">
                    {b_InActivityDate}
                </label>
            </div>
            <hr />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4"
            onClick={handleSubmit}
        >
            Save
        </button>
    </div>
    );
};
