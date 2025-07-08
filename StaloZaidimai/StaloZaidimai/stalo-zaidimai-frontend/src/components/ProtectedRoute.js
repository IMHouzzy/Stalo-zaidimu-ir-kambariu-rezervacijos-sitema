import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('authToken');
    let userRole = null;

    // Jei tokenas yra, pabandome jį dekoduoti
    if (token) {
        try {
            const decodedToken = jwtDecode(token);  // Naudokite jwtDecode funkciją

            // Patikrinkite, ar yra 'role' laukas su teisingu URI keliu
            userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        } catch (error) {
            console.error('Nepavyko dekoduoti tokeno:', error);
        }
    }

    // Patikriname, ar tokenas egzistuoja ir ar vartotojo rolė atitinka reikalavimus
    if (!token || (requiredRole && userRole !== requiredRole)) {
        return <Navigate to="/login" />;  // Jei ne, nukreipiame į prisijungimo puslapį
    }

    return children;  // Jei vartotojas yra autentifikuotas ir turi reikiamą rolę, grąžiname vaikų komponentus
};

export default ProtectedRoute;
