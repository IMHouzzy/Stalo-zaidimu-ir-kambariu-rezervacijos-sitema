import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import StaloZaidimuList from './components/StaloZaidimuList';
import Rezervacija from './components/Rezervacija';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
import Edit from './components/Edit';
import AddGame from './components/AddGame';
import Registration from './components/Register';
import AdminPage from './components/AdminPage';
import StaloZaidimuListUser from './components/StaloZaidimuListUser';
import RoomList from './components/RoomList';
import EditRoom from './components/EditRoom';
import AddRoom from './components/AddRoom';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeList from './components/EmployeeList';
import RezervacijosList from './components/RezervacijosList';
import EditReservation from './components/EditReservation';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteNoConn from './components/ProtectedRouteNoConn';

function App() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return token ? true : false;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return (
        <div className="App">
            {/* Header */}
            <header className="App-header">
                <div id="header">
                    <div className="header">
                        <div className="logo">
                            <Link to="/">
                                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
                            </Link>
                        </div>
                        <div className="title">Žaidimų Alėja</div>
                    </div>

                    {/* Navigation */}
                    <nav className="menu">
                        <ul>
                            <li>
                                <Link to="/">Pagrindinis</Link>
                            </li>
                            <li>
                                <Link to="/Kambario-rezervacija">Kambarių rezervacija</Link>
                            </li>
                            <li>
                                <Link to="/Stalo-Žaidimų-SąrašasUser">Stalo žaidimų sąrašas</Link>
                            </li>
                            <li>
                                <Link to="/AdminPage">Administratoriaus puslapis</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="login-btn">
                        {isAuthenticated() ? (
                            <button onClick={logout}>
                                Atsijungti
                            </button>
                        ) : (
                            <>
                                <button style={{ marginRight: '10px' }} onClick={() => navigate('/login')}>
                                    Prisijungti
                                </button>
                                <button onClick={() => navigate('/register')}>
                                    Registruotis
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Stalo-Žaidimų-Sąrašas" element={<StaloZaidimuList />} />
                <Route path="/Stalo-Žaidimų-SąrašasUser" element={<StaloZaidimuListUser />} />
                <Route path="/Kambario-rezervacija" element={<ProtectedRouteNoConn><Rezervacija /></ProtectedRouteNoConn>} />

                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/AddGame" element={<AddGame />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminPage"element={ <ProtectedRoute requiredRole="Admin"><AdminPage /> </ProtectedRoute> }/>
                <Route path="/rooms" element={<RoomList />} />
                <Route path="/editRoom/:id" element={<EditRoom />} />
                <Route path="/AddRoom" element={<AddRoom />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/editEmployee/:id" element={<EditEmployee />} />
                <Route path="/AddEmployee" element={<AddEmployee />} />
                <Route path="/GetReservations" element={<RezervacijosList />} />
                <Route path="/editReservations/:id" element={<EditReservation />} />
            </Routes>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}
