import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../Utilities/Context";
import Alert from '../Components/Alert/Alert';
import Nav from '../Components/Nav/Nav';
import Side from '../Components/Side/Side';
import { Link, useNavigate } from 'react-router-dom';
import { userAuth } from '../Utilities/userAuth';
import '../Styles/alljobs.css'
import { faCalendarDays, faLocationArrow, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
const Alljobs = () => {
  const navigate = useNavigate();
  const { sideBar, userDetails, updateInfo, showAlert } = useGlobalContext();
  const [tempJob, setTempJob] = useState([])
  const [job, setJob] = useState({
    position: '',
    status: '',
    type: ''
  })
  const handleChangePosition = (e) => {
    const pos = e.target.value.toLowerCase();
    axios.get(`http://localhost:5000/jobs/getjobbyposition?posi=${pos}`).then(({ data }) => {
      const { tempRes } = data;
      setTempJob(tempRes)
    }).catch(err => console.log(err))
    setJob({ ...job, position: e.target.value })
  }
  const handleChangeStatus = (e) => {
    axios.get(`http://localhost:5000/jobs/getjobbystatus?posi=${e.target.value}`).then(({ data }) => {
      const { tempRes } = data;
      setTempJob(tempRes)
    }).catch(err => console.log(err))
    setJob({ ...job, status: e.target.value })
  }
  const handleChangeType = (e) => {
    axios.get(`http://localhost:5000/jobs/getjobbytype?posi=${e.target.value}`).then(({ data }) => {
      const { tempRes } = data;
      setTempJob(tempRes)
    }).catch(err => console.log(err))
    setJob({ ...job, type: e.target.value })
  }
  useEffect(() => {
    axios.get('http://localhost:5000/jobs/getjob').then(({ data }) => {
      const { result } = data;
      setTempJob(result)
    }).catch(err => console.log(err))
  }, []);
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
          <section className='beside-sidebar-alljobs'>
            <div className='alljobs'>
              <form className='filters rounded shadow'>
                <h2 className='mb-4 fw-light'>Search Form</h2>
                <article className='row mb-5 row-cols-2 row-cols-md-3'>
                  <div className='col'>
                    <label htmlFor='position' className="form-label">Search</label>
                    <input
                      value={job.position}
                      onChange={handleChangePosition}
                      name='position'
                      type="text"
                      id='position'
                      className="form-control" placeholder="Position" />
                  </div>
                  <div className='col'>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                      value={job.status}
                      onChange={handleChangeStatus}
                      name='status'
                      id="status" className="form-select">
                      <option value=''>Choose...</option>
                      <option value='all'>All</option>
                      <option value='pending'>Pending</option>
                      <option value='interview'>Interview</option>
                      <option value='declined'>Declined</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="type" className="form-label">Type</label>
                    <select
                      value={job.type}
                      onChange={handleChangeType}
                      name='status'
                      id="type"
                      className="form-select">
                      <option value=''>Choose...</option>
                      <option value='all'>All</option>
                      <option value='full-time'>Full Time</option>
                      <option value='part-time'>Part Time</option>
                      <option value='remote'>Remote</option>
                      <option value='internship'>Internship</option>
                    </select>
                  </div>
                </article>
                <article className='row row-cols-3'>
                  <div className='col'>
                    <button
                      onClick={() => {
                        axios.get('http://localhost:5000/jobs/getjob').then(({ data }) => {
                          const { result } = data;
                          console.log(result)
                          setTempJob(result)
                        }).catch(err => console.log(err))
                        setJob({
                          ...job,
                          position: '',
                          status: '',
                          type: ''
                        })
                      }}
                      style={{ width: '100%' }}
                      className='my-clear-btn shadow'>Clear Filters</button>
                  </div>
                </article>
              </form>
              <h3 className='mt-5 fw-light'>Results {tempJob.length > 0 && tempJob.length}</h3>
              {
                tempJob.length === 0 ? (<h1 className='text-center text-danger-emphasis'>Nothing here</h1>) :
                  (<section className='jobs'>
                    <div
                      style={{ width: '100%' }}
                      className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                      {tempJob?.map((item) => {
                        return <article key={item._id} className='col mb-3'>
                          <div className='rounded shadow job-result'>
                            <div className="d-flex align-items-center">
                              <h3
                                style={{ backgroundColor: '#9dfd78', color: '#222', padding: '.5rem 1rem', width: 'fit-content' }}
                                className='rounded text-capitalize fw-normal shadow-sm'>{item.company.slice(0, 1)}</h3>
                              <div className='ms-3'>
                                <p className='m-0 fw-bold fs-5 text-capitalize'>{item.position}</p>
                                <p className='m-0 text-capitalize'>{item.company}</p>
                              </div>
                            </div>
                            <hr />
                            <div className='mb-3 d-flex justify-content-between align-items-center'>
                              <p className='m-0 text-capitalize'>
                                <span className='me-2'>
                                  <FontAwesomeIcon icon={faLocationArrow} />
                                </span>
                                {item.location}</p>
                              <p className='m-0'>
                                <span className='me-2'><FontAwesomeIcon icon={faCalendarDays} /></span>
                                {item.date}</p>
                            </div>
                            <div className='mb-3 d-flex justify-content-between align-items-center'>
                              <p className='m-0 text-capitalize'>
                                <span className='me-2'><FontAwesomeIcon icon={faSuitcase} /></span>
                                {item.type}</p>
                              <aside
                                style={{
                                  color: `${(item.status === 'pending') ? '#a08300' : ''}
                              ${(item.status === 'declined') ? '#fff' : ''}
                              ${(item.status === 'interview') ? '#003088' : ''}
                              `,
                                  backgroundColor: `${(item.status === 'pending') ? '#ffe262' : ''}
                              ${(item.status === 'declined') ? '#da0000' : ''}
                              ${(item.status === 'interview') ? '#5c95ff' : ''}
                              `
                                }}
                                className='my-status text-capitalize'>{item.status}</aside>
                            </div>
                            <div>
                              <Link 
                              to={`/alljobs/${item._id}`}
                              className='my-start-btn py-2'>
                                Edit
                              </Link>
                              <button
                              onClick={()=> {
                                axios.delete(`http://localhost:5000/jobs/deletejob?job=${item._id}`).then(({data})=>{
                                  const {result} = data;
                                   setTempJob(result)
                                    showAlert({
                                      msg: 'deleted...',
                                      type: 'success'
                                    })
                                  }).catch(err => console.log(err))
                              }}
                              className='ms-2 py-1  my-clear-btn'>
                                Delete
                              </button>
                            </div>
                          </div>
                        </article>
                      })}
                    </div>
                  </section>
                  )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Alljobs