import React, { useState, useEffect } from 'react';
import "../App.css";
import { updateEmployee } from '../api/apiService';  // Adjust path if needed
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams(); // Get the ID of the employee from the URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hireDate, setHireDate] = useState('');

    useEffect(() => {
        // Fetch employee data and populate the form
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:5244/EditEmployee/${id}`);
                const data = await response.json();
                setName(data.name);
                setSurname(data.surname);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setHireDate(data.hireDate);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEmployee = {
            IdDarbuotojas: id,
            Name: name,
            Surname: surname,
            Email: email,
            PhoneNumber: phoneNumber,
            HireDate: hireDate,
        };

        try {
            await updateEmployee(id, updatedEmployee); // Use the API service function
            navigate('/employees'); // Redirect to the list after successful update
        } catch (error) {
            console.error('Failed to update employee:', error);
        }
    };

    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Edit Employee</h2>
                    <form className="reservation-form" onSubmit={handleSubmit}>
                        {/* The form fields will be similar to the AddEmployee page */}
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
                            <button type="submit">Update Employee</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default EditEmployee;
