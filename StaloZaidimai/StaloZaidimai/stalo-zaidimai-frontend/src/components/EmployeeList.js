import React, { useEffect, useState } from 'react';
import "../App.css";
import { getEmployees, deleteEmployee } from '../api/apiService';  // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch employee data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter(employee => employee.idDarbuotojas !== id)); // Remove deleted employee from state
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div id="content">
            <div id="contentRight">
                <section className="room-list-section">
                    <div className="room-list-title">
                        <h2>Darbuotojų sąrašas</h2>
                        <button onClick={() => navigate("/AddEmployee")}>Pridėti naują darbuotoją +</button>
                    </div>
                    {employees.length ? (
                        employees.map((employee) => (
                            <div className="room-item" key={employee.idDarbuotojas}>
                                <div className="room-info">
                                    <h3>Name: {employee.name} {employee.surname}</h3>
                                    <p>Email: {employee.email}</p>
                                    <p>Phone: {employee.phoneNumber}</p>
                                    <p>Hire Date: {employee.hireDate}</p>
                                    <div className="edit-remove-buttons">
                                        <div className="button-container">
                                            <button
                                                className="action-button edit-button"
                                                style={{ marginRight: '10px' }}
                                                onClick={() => navigate(`/editEmployee/${employee.idDarbuotojas}`)} // Redirect to Edit page
                                            >
                                                Redaguoti
                                            </button>
                                            <button
                                                className="action-button delete-button"
                                                onClick={() => handleDelete(employee.idDarbuotojas)} // Call handleDelete
                                            >
                                                Pašalinti
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No employees available.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default EmployeeList;
