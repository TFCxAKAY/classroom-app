import React, { useState } from 'react';
import './auth.css'

export default function AuthForm() {
    const [isLogin, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/createUser';
        const payload = isLogin ? { email, password } : { name, email, password, role };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            console.log('Success:', data);

            // Redirect user or update UI accordingly
            // Example: history.push('/dashboard');
        } catch (error) {
            setError('Failed to authenticate. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ""} onClick={() => setLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setLogin(false)}>Signup</button>
                </div>
                <form onSubmit={handleSubmit}>
                    {isLogin ? (
                        <div className='form'>
                            <h2>Login Form</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type='submit' disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            <p>Not a member? <a href='#' onClick={() => setLogin(false)}>Signup now</a></p>
                        </div>
                    ) : (
                        <div className='form'>
                            <h2>Signup Form</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <input
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type='text'
                                placeholder='Role (Teacher, Student)'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                            <button type='submit' disabled={loading}>
                                {loading ? 'Signing up...' : 'Signup'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
