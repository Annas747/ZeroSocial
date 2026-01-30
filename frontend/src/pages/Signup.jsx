/**
 * Signup Page - Facebook Style
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';

function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const displayName = `${firstName} ${lastName}`.trim() || username;
            const response = await axios.post('/api/auth/signup', {
                username,
                password,
                displayName
            });

            login(response.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card" style={{ maxWidth: 432 }}>
                <h1 style={{ fontSize: 32, fontWeight: 600, textAlign: 'center', marginBottom: 4 }}>
                    Create a new account
                </h1>
                <p className="auth-subtitle">It's quick and easy.</p>

                <div className="auth-divider" style={{ marginTop: 0 }}></div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{ flex: 1 }}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Mobile number or email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-input"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <p style={{ fontSize: 11, color: '#777', marginBottom: 12 }}>
                        By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
                    </p>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="submit"
                            className="btn btn-signup"
                            style={{ padding: '8px 64px' }}
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <p className="auth-footer">
                    <Link to="/login">Already have an account?</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
