import React, { useState } from 'react';
import '../App.css'; // Import your app styles
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/apiService'; // Import the registerUser function
import { addEmployee } from '../api/apiService'; // Import the addEmployee function

const Register = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('User'); // Default role is 'User'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //// Frontend validation
        //if (name === "Mantas" && age < 31) {
        //    alert("Jei vardas yra 'Mantas', amžius negali būti mažesnis nei 31.");
        //    return; // Stop the form submission
        //}
        
        const newUser = {
            Username: username,
            Name: name,
            Surname: surname,
            Email: email,
            Password: password,
            Age: age,
            PhoneNumber: phoneNumber,
            Role: role,
        };

        const hireDate = new Date().toISOString().split('T')[0];

        try {
            await registerUser(newUser);

            if (role === "Admin") {
                const newEmployee = {
                    Name: name,
                    Surname: surname,
                    Email: email,
                    PhoneNumber: phoneNumber,
                    HireDate: hireDate,
                };

                await addEmployee(newEmployee);
            }

            navigate("/login");
        } catch (error) {
            console.error("Failed to register user:", error);
        }
    };


    return (
        <div id="content">
            <div id="contentRight">
                <section className="registration-section">
                    <h2 id="registration-title">Registracija</h2>
                    <form className="registration-form" onSubmit={handleSubmit}>
                        <div className="registration-group">
                            <label htmlFor="reg-username">Vartotojo vardas:</label>
                            <input
                                type="text"
                                id="reg-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Įveskite vartotojo vardą"
                                required
                            />
                        </div>

                        <div className="registration-group">
                            <label htmlFor="reg-name">Vardas:</label>
                            <input
                                type="text"
                                id="reg-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Įveskite vardą"
                                required
                            />
                        </div>

                        <div className="registration-group">
                            <label htmlFor="reg-surname">Pavardė:</label>
                            <input
                                type="text"
                                id="reg-surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder="Įveskite pavardę"
                                required
                            />
                        </div>

                        <div className="registration-group">
                            <label htmlFor="reg-email">El. paštas:</label>
                            <input
                                type="email"
                                id="reg-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Įveskite el. paštą"
                                required
                            />
                        </div>

                        <div className="registration-group">
                            <label htmlFor="reg-password">Slaptažodis:</label>
                            <input
                                type="password"
                                id="reg-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Įveskite slaptažodį"
                                required
                            />
                        </div>

                        <div className="registration-group">
                            <label htmlFor="reg-age">Amžius:</label>
                            <input
                                type="number"
                                id="reg-age"
                                min="1"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Įveskite savo amžių"
                                required
                            />
                        </div>

                        <div className="registration-group">
                            <label htmlFor="reg-phoneNumber">Telefono numeris:</label>
                            <input
                                type="text"
                                id="reg-phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Įveskite savo telefono numerį"
                                required
                            />
                        </div>
                        <div className="registration-group">
                            <label htmlFor="reg-role">Rolė:</label>
                            <select
                                id="reg-role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        
                        
                        <div className="registration-group">
                            <button type="submit">Registruotis</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Register;
