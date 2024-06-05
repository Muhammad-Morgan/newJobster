import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
import "../Styles/signin.css"
import axios from 'axios'
const Login = () => {
    const { showAlert } = useGlobalContext();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://new-jobster-server.vercel.app/user/login', {
            email: user.email,
            password: user.password
        }).then(({ data }) => {
            const { type } = data;
            if (type === 'danger') return showAlert({
                msg: data.msg,
                type
            })
            localStorage.setItem('lToken', data.myToken);
            navigate('/dashboard')
            showAlert({ msg: data.msg, type })
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        const lToken = localStorage.getItem('lToken')
        axios.get(`https://new-jobster-server.vercel.app/user/auth?token=${lToken}`).then(({ data }) => {
            const { type } = data;
            if (type === 'success') return navigate('/dashboard')
        }).catch(err => console.log(err))
    }, [navigate])
    return (
        <form
        onSubmit={handleSubmit}
        className='form-con shadow rounded'>
            <h1 className='mb-md-4 text-primary fs-md-1 text-center'>Sign In</h1>
            <div className="form-floating mb-3">
                <input
                    value={user.email}
                    onChange={handleChange}
                    type="email" name='email' className="form-control" id="email" placeholder="name@example.com" />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    value={user.password}
                    onChange={handleChange}
                    type="password" className="form-control" id="password" name='password' placeholder="Password" />
                <label htmlFor="password">Password</label>
            </div>
            <div id="passwordHelpBlock"
                className="form-text d-none d-md-block mb-1">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>
            <small className='ms-1'>Not a member? <Link to='/register' className='text-primary' style={{ textDecoration: 'none' }}>Register</Link></small>
            <div className='d-flex'>
                <button
                    type='submit'
                     className="sign-btn mt-3 rounded shadow-sm">Log In</button>
            </div>

        </form>
    )
}

export default Login
