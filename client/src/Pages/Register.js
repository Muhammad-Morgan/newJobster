import React, { useState, useEffect } from 'react'
import '../Styles/signin.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../Utilities/Context'
const Register = () => {
    const navigate = useNavigate()
    const { showAlert } = useGlobalContext();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        type: ''
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
        const tempUser = {
            ...user,
            name: user.name.toLowerCase(),
            myID: new Date().getTime().toString()
        }
        if(user.name && user.email && user.password && user.type){
            axios.post('http://localhost:5000/user/register', {
                name: tempUser.name,
                email: tempUser.email,
                password: tempUser.password,
                type: tempUser.type,
                myID: tempUser.myID,
            }).then(({ data }) => {
                const { myToken, type, msg } = data;
                localStorage.setItem('lToken', myToken);
                showAlert({
                    msg,
                    type
                })
            }).catch(err => console.log(err))
            }else{
                showAlert({
                    msg: 'fill it all !',
                    type: 'danger'
                })
        }
    }
    useEffect(()=>{
        const lToken = localStorage.getItem('lToken')
        axios.get(`http://localhost:5000/user/auth?token=${lToken}`).then(({data})=>{
            const {type}=data;
            if(type === 'success') return navigate('/dashboard')
        }).catch(err=>console.log(err))
    },[])
    return (
        <form 
        onSubmit={handleSubmit}
        className='form-con shadow rounded'>
            <h2 className='mb-4 text-primary fs-1 text-center'>Sign Up</h2>
            <div className="form-floating mb-3">
                <input
                    onChange={handleChange}
                    type="text"
                    name='name'
                    className="form-control"
                    id="name"
                    placeholder="Muhammad"
                    value={user.name}
                />
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={handleChange}
                    type="email"
                    name='email'
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={user.email}
                />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={handleChange}
                    type="password"
                    name='password'
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={user.password}
                />
                <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating">
                <select
                    onChange={handleChange}
                    className="form-select"
                    name='type'
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    value={user.type}
                >
                    <option value=""></option>
                    <option value="employer">Employer</option>
                    <option value="employee">Employee</option>
                </select>
                <label htmlFor="floatingSelect">Employer / Employee</label>
            </div>
            <small className='ms-1'>Not a member? <Link to='/login' className='text-primary' style={{ textDecoration: 'none' }}>Login</Link></small>
            <div className='d-flex mt-2'>
                <button
                    type="submit" className="sign-btn rounded shadow-sm">Register</button>
            </div>

        </form>
    )
}

export default Register
