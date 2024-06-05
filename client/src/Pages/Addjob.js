import React, { useEffect, useState } from 'react'
import Side from '../Components/Side/Side'
import { useNavigate } from 'react-router-dom'
import Nav from '../Components/Nav/Nav'
import { userAuth } from '../Utilities/userAuth'
import Alert from '../Components/Alert/Alert'
import { useGlobalContext } from '../Utilities/Context'
import '../Styles/addjob.css'
import axios from 'axios'
const Addjob = () => {
    const navigate = useNavigate()
    const { sideBar, showAlert, userDetails, updateInfo } = useGlobalContext();
    const [job, setJob] = useState({
        position: '',
        company: '',
        location: '',
        status: '',
        type: ''
    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJob({
            ...job,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (job.position && job.company && job.location && job.status && job.type) {
            const getCurrentDate = () => {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const year = today.getFullYear();
            
                return `${day}/${month}/${year}`;
              };
            axios.post('https://new-jobster-server.vercel.app/jobs/addjob', {
                position: job.position,
                company: job.company,
                location: job.location,
                status: job.status,
                type: job.type,
                date: getCurrentDate()
            }).then(({ data }) => {
                const { msg, type } = data;
                if (type === 'danger') return showAlert({
                    msg,
                    type
                })
                setJob({
                    ...job,
                    position: '',
                    company: '',
                    location: '',
                    status: '',
                    type: ''
                })
                navigate('/alljobs')
                showAlert({
                    msg,
                    type
                })
            }).catch(err => console.log(err))
        } else {
            showAlert({
                msg: 'fill all requirements',
                type: 'danger'
            })
        }
    }
    const handleClear = (e) => {
        e.preventDefault();
        setJob({
            ...job,
            position: '',
            company: '',
            location: '',
            status: '',
            type: ''
        })
    }
    useEffect(() => {
        userAuth({ navigate, updateInfo, showAlert })
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
                        <div className='addjob'>
                            <form
                                onSubmit={handleSubmit}
                                className='job-widget rounded shadow'>
                                <h2 className='fw-light mb-4'>Add Job</h2>
                                <section className='row row-cols-2 row-cols-md-3'>
                                    <article className='col'>
                                        <div>
                                            <label htmlFor="position" className="form-label">Position</label>
                                            <input type="text"
                                                value={job.position}
                                                onChange={handleChange}
                                                name='position'
                                                className="form-control"
                                                id="position"
                                            />
                                        </div>
                                    </article>
                                    <article className='col'>
                                        <div>
                                            <label htmlFor="company" className="form-label">Company</label>
                                            <input type="text"
                                                value={job.company}
                                                onChange={handleChange}
                                                name='company'
                                                className="form-control"
                                                id="company"
                                            />
                                        </div>
                                    </article>
                                    <article className='col'>
                                        <div>
                                            <label htmlFor="location" className="form-label">Job Location</label>
                                            <input type="text"
                                                value={job.location}
                                                onChange={handleChange}
                                                name='location'
                                                className="form-control"
                                                id="location"
                                            />
                                        </div>
                                    </article>
                                    <article className='col mt-4'>
                                        <div>
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select
                                                value={job.status}
                                                onChange={handleChange}
                                                name='status'
                                                id="status"
                                                className="form-select"
                                            >
                                                <option>Choose...</option>
                                                <option value='pending'>Pending</option>
                                                <option value='declined'>Declined</option>
                                                <option value='interview'>Interview</option>
                                            </select>
                                        </div>
                                    </article>
                                    <article className='col mt-4'>
                                        <div>
                                            <label for="type" className="form-label">Type</label>
                                            <select
                                                value={job.type}
                                                onChange={handleChange}
                                                name='type'
                                                id="type"
                                                className="form-select"
                                            >
                                                <option>Choose...</option>
                                                <option value='full-time'>Full Time</option>
                                                <option value='part-time'>Part Time</option>
                                                <option value='internship'>Internship</option>
                                                <option value='remote'>Remote</option>
                                            </select>
                                        </div>
                                    </article>
                                    <article className='col mt-4'>
                                        <div
                                            style={{ height: '100%' }}
                                            className="d-flex justify-content-between align-items-end">
                                            <button
                                                style={{ paddingInline: '3rem', letterSpacing: '1px' }}
                                                type='submit'
                                                className='my-start-btn shadow'>Submit</button>
                                            <button
                                                onClick={handleClear}
                                                className='job-clear shadow'>Clear</button>
                                        </div>
                                    </article>
                                </section>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Addjob
