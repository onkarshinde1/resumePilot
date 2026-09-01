import React, { useState } from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

function Login() {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in both email and password");
            return;
        }

        const res = await handleLogin({ email, password });
        if (res.success) {
            navigate("/dashboard");
        } else {
            setError(res.error || "Invalid email or password");
        }
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            id='email' 
                            name='email' 
                            placeholder='Enter email address' 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            id='password' 
                            name='password' 
                            placeholder='Enter your password' 
                            required
                        />
                    </div>
                    <button className='button primary-button' type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login