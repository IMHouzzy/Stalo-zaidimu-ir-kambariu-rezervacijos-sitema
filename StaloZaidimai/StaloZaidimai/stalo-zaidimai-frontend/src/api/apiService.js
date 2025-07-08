// src/api/apiService.js
import axios from 'axios';
export const getData = async () => {
    try {
        const response = await fetch('http://localhost:5244/Test'); // Check this URL
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


const API_BASE_URL = 'http://localhost:5244';

export const updateGame = async (id, updatedGame) => {
    const response = await fetch(`${API_BASE_URL}/edit/${id}`, {
        method: 'PUT',  // Ensure we're using the PUT method
        headers: {
            'Content-Type': 'application/json',  // Sending JSON data
        },
        body: JSON.stringify(updatedGame),  // The updated game data
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to update game. Status: ${response.status}, Message: ${errorText}`);
    }

    return response.json();
};
export const deleteGame = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Test/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete game');
        }

        return await response.json(); // Return the deleted game or success message
    } catch (error) {
        console.error('Error deleting game:', error);
        throw error;
    }
};


export const addGame = async (newGame) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/AddGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGame),
        });

        if (!response.ok) {
            throw new Error('Failed to add new game');
        }

        return await response.json(); // Return the newly added game
    } catch (error) {
        console.error("Error adding game:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};


export const registerUser = async (newUser) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        return await response.json(); // Return the newly registered user
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Re-throw error for handling in the calling function
    }
};



// Base URL for your backend API
const API_BASE_URL2 = 'http://localhost:5244/api/Reservation';

export const fetchBoardGames = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL2}/GetBoardGames`);
        return response.data;
    } catch (error) {
        console.error('Error fetching board games:', error);
        throw error;
    }
};

export const fetchRooms = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL2}/GetRooms`);
        return response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};

export const postReservation = async (reservationData) => {
  try {
    const response = await fetch("http://localhost:5244/api/Reservation/CreateReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (response.ok) {
      // Assuming the response is the PDF file
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Rezervacija.pdf";
      link.click();
    } else {
      // Handle the error response
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error posting reservation:", error);
  }
};

// Function to fetch room data
export const getRoom = async () => {
    try {
        const response = await fetch('http://localhost:5244/Room'); // Adjusted URL for your backend
        if (!response.ok) {
            throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Function to delete a room
export const deleteRoom = async (id) => {
    try {
        const response = await fetch(`http://localhost:5244/Room/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete room');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting room:', error);
        throw error;
    }
};

export const updateRoom = async (id, updatedRoom) => {
    const response = await fetch(`http://localhost:5244/EditRoom/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRoom),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to update room. Status: ${response.status}, Message: ${errorText}`);
    }

    return response.json();
};

export const addRoom = async (newRoom) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/AddRoom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRoom),
        });

        if (!response.ok) {
            throw new Error('Failed to add new room');
        }

        return await response.json(); // Return the newly added room
    } catch (error) {
        console.error("Error adding room:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};




// API service for employee operations

// Function to fetch all employees
export const getEmployees = async () => {
    try {
        const response = await fetch('http://localhost:5244/Employee'); // Adjust the URL as per your API
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

// Function to add a new employee
export const addEmployee = async (newEmployee) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/AddEmployee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        });
        if (!response.ok) {
            throw new Error('Failed to add employee');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

// Function to delete an employee
export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`http://localhost:5244/Employee/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete employee');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};

// Function to update an employee's information
export const updateEmployee = async (id, updatedEmployee) => {
    try {
        const response = await fetch(`http://localhost:5244/EditEmployee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEmployee),
        });
        if (!response.ok) {
            throw new Error('Failed to update employee');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};
export const fetchReservations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL2}/GetReservations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
};

export const deleteReservations = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL2}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete Reservations');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting Reservations:', error);
        throw error;
    }
};



const API_BASE_URL3 = "http://localhost:5244/api"; // Adjust to your backend's base URL

// Fetch reservation by ID
export const fetchReservationById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL3}/Reservation/${id}`);
        return response.data; // Ensure the backend sends the correct data structure
    } catch (error) {
        console.error("Error fetching reservation by ID:", error);
        throw error;
    }
};

export const updateReservation = async (id, updatedReservation) => {
    const response = await fetch(`http://localhost:5244/api/Reservation/EditReservation/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", // Ensure the content type is correct
        },
        body: JSON.stringify(updatedReservation) // Ensure the request body is properly serialized
    });

    if (!response.ok) {
        throw new Error(`Failed to update reservation. Status: ${response.status}`);
    }

    return await response.json(); // or just return response if you don't need to process the response
};
// apiService.js

export const loginUser = async (credentials) => {
    try {
        const response = await fetch('http://localhost:5244/api/Login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json(); // Skaityti klaidos žinutę iš serverio
            throw new Error(error.message || 'Login failed');
        }

        return await response.json(); // Gauti atsakymą (JWT tokeną)
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};


