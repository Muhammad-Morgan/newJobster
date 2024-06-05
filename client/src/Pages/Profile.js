import React, { useState, useEffect } from 'react'
import '../Styles/profile.css'
import Alert from '../Components/Alert/Alert'
import Nav from '../Components/Nav/Nav'
import Side from '../Components/Side/Side'
import { useGlobalContext } from '../Utilities/Context'
import { useNavigate } from 'react-router-dom'
import { userAuth, updateUser } from '../Utilities/userAuth'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const Profile = () => {
    const navigate = useNavigate();
    const { sideBar, userDetails, updateInfo, showAlert } = useGlobalContext();
    const [user, setUser] = useState({
        name: '',
        lastname: '',
        email: '',
        location: ''
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
        axios.put(`http://localhost:5000/user/updateuser?myID=${userDetails.myID}`, {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            location: user.location,
        }).then(({ data }) => {
            const { type, msg } = data;
            if (type === 'danger') return showAlert({ msg, type })
            const lToken = localStorage.getItem('lToken')
            updateUser({ user, setUser, lToken });
            const myData = jwtDecode(lToken);
            axios.post(`http://localhost:5000/user/createtoken?name=${user.name}`, {
                myID: myData.myID,
                type: myData.type
            }).then(({ data }) => {
                const { token } = data;
                localStorage.setItem('lToken', token)
                updateInfo({ name: user.name })
            }).catch(err => console.log(err))

            showAlert({
                msg,
                type
            })
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        const lToken = localStorage.getItem('lToken')
        updateUser({ user, setUser, lToken })
    }, []);
    useEffect(() => {
        userAuth({
            navigate, showAlert, updateInfo
        })
    }, [userDetails.name])
    return (
        <>
            <Alert />
            <Nav />
            <div
                style={{
                    transition: 'all 0.1s linear'
                }}
                className="d-flex justify-content-between">
                <div>
                    <Side />
                </div>
                <div
                    style={{
                        transition: 'all 0.1s linear'
                    }}
                    className={`${sideBar ? 'main-sidebar-open' : 'main'}`}>
                    <section className='beside-sidebar'>
                        <section className='profile'>
                            <form
                                onSubmit={handleSubmit}
                                className='profile-center rounded shadow'>
                                <h2 className='fw-light mb-4'>Profile</h2>
                                <div className='row row-cols-2 row-cols-md-3'>
                                    <article className='col'>
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            value={user?.name}
                                            onChange={handleChange}
                                            name='name'
                                            type="text"
                                            className="form-control"
                                            id="name" />
                                    </article>
                                    <article className='col'>
                                        <label htmlFor="lastname" className="form-label">Last Name</label>
                                        <input
                                            value={user?.lastname}
                                            onChange={handleChange}
                                            name='lastname'
                                            type="text" className="form-control" id="lastname" />
                                    </article>
                                    <article className='col'>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            value={user?.email}
                                            onChange={handleChange}
                                            name='email'
                                            type="email" className="form-control" id="email" />
                                    </article>
                                    <article className='col'>
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input
                                            value={user?.location}
                                            onChange={handleChange}
                                            name='location'
                                            type="text" className="form-control" id="location" />
                                    </article>
                                    <article className='col'>
                                        <div
                                            style={{ height: '100%' }}
                                            className="d-flex align-items-end">
                                            <button
                                                type='submit'
                                                style={{ letterSpacing: '1px', width: '100%' }}
                                                className='my-start-btn'>Save</button>
                                        </div>
                                    </article>
                                </div>
                            </form>
                        </section>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Profile
