/**
 * Login Page - Facebook Style
 * Side-by-side layout on desktop
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password
            });

            login(response.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left side - Hero text */}
            <div className="auth-hero">
                <h1>facebook</h1>
                <p>Connect with friends and the world around you on Facebook.</p>
            </div>

            {/* Right side - Login form */}
            <div className="auth-card">
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Email or phone number"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '12px', fontSize: 20, fontWeight: 700 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <a href="#" style={{ color: '#1877f2', textDecoration: 'none', fontSize: 14 }}>
                        Forgotten password?
                    </a>
                </div>

                <div className="auth-divider"></div>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/signup" className="btn btn-signup">
                        Create new account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
