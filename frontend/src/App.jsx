/**
 * App Component - Facebook Style
 */

import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function App() {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('zerosocial_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('zerosocial_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('zerosocial_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <BrowserRouter>
                {user && <Navbar />}

                <Routes>
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" /> : <Login />}
                    />
                    <Route
                        path="/signup"
                        element={user ? <Navigate to="/" /> : <Signup />}
                    />
                    <Route
                        path="/"
                        element={user ? <Feed /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile/:userId"
                        element={user ? <Profile /> : <Navigate to="/login" />}
                    />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
