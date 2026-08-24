import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const Register = () => {

    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("")

    const {handleRegister , loading} = useAuth()

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await handleRegister({username , email , password})
        navigate("/")
    }
    if (loading) {
        return (<main><h1>Loading.....</h1></main>)
    }

    return (
        <div> 
            <main>
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">name</label>
                            <input 
                            onChange={(e)=> {setUsername(e.target.value)}}
                            type="text" id='name' name='name' placeholder='Enter username' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">email</label>
                            <input 
                                onChange={(e) => { setEmail(e.target.value) }}
                            type="text" id='email' name='email' placeholder='Enter email address' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">password</label>
                            <input 
                                onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id='password' name='password' placeholder='Enter your password' />
                        </div>
                        <button className='button primary-button' type="submit">Login</button>
                    </form>

                    <p>Alredy have an account? <Link to={"/login"}>Login</Link></p>
                </div>
            </main>
        </div>
    );
}

export default Register;
