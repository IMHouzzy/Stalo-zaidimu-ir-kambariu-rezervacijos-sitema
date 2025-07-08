import React, { useState } from 'react';
import "../App.css";
import { addEmployee } from '../api/apiService';  // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hireDate, setHireDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEmployee = {
            Name: name,
            Surname: surname,
            Email: email,
            PhoneNumber: phoneNumber,
            HireDate: hireDate,
        };

        try {
            await addEmployee(newEmployee); // Use the API service function
            navigate('/employees'); // Redirect after successfully adding the employee
        } catch (error) {
            console.error('Failed to add employee:', error);
        }
    };

    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Add New Employee</h2>
                    <form className="reservation-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="surname">Last Name</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hireDate">Hire Date</label>
                            <input
                                type="date"
                                id="hireDate"
                                name="hireDate"
                                value={hireDate}
                                onChange={(e) => setHireDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit">Add Employee</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddEmployee;
