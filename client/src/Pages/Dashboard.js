import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../Utilities/Context";
import Alert from '../Components/Alert/Alert';
import Nav from '../Components/Nav/Nav';
import Side from '../Components/Side/Side';
import '../Styles/dashboard.css'
import { useNavigate } from 'react-router-dom';
import { userAuth } from '../Utilities/userAuth'
import axios from 'axios';
import { faBug, faCalendarCheck, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Dashboard = () => {
  const navigate = useNavigate();
  const { sideBar, updateInfo, showAlert, userDetails } = useGlobalContext();
  const [num,setNum] = useState({
    pending: 0,
    interview: 0,
    declined: 0
  })
  useEffect(() => {
    axios.get('http://localhost:5000/jobs/getnumber').then(({data})=>{
      const {tempNum} = data;
      setNum({
        ...num,
        pending: tempNum.pending,
        interview: tempNum.interview,
        declined: tempNum.declined,
      })
    }).catch(err => console.log(err))
  }, [num.pending,num.interview,num.declined]);
  useEffect(() => {
    userAuth({ updateInfo, showAlert, navigate })
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
            <div className='stats'>
              <article
                style={{ width: '100%' }}
                className='mx-auto row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                <div className='col mb-3'>
                  <section className='rounded shadow dashboard-stats-pending'>
                    <div className=' d-flex justify-content-between align-items-center'>
                      <h2
                        style={{
                          letterSpacing: '1px'
                        }}
                        className='fw-light'>Pending</h2>
                        <div 
                        style={{backgroundColor: '#f8e993'}}
                        className='rounded shadow-sm py-2 px-3'>
                          <FontAwesomeIcon color='#816e01' className='fa-xl' icon={faSuitcaseRolling} />
                        </div>
                    </div>
                    <hr />
                    <div>
                      <div className='d-flex justify-content-between'>
                        <h2
                          style={{ color: '#e6bb00' }}
                        >{num.pending}</h2>
                        <h4 className='fw-normal '>Job</h4>
                      </div>
                    </div>
                  </section>
                </div>
                <div className='col mb-3'>
                  <section className='rounded shadow dashboard-stats-interview'>
                  <div className=' d-flex justify-content-between align-items-center'>
                  <h2
                      style={{
                        letterSpacing: '1px'
                      }} className='fw-light '>Interview</h2>
                        <div 
                        style={{backgroundColor: '#5c95ff'}}
                        className='rounded shadow-sm py-2 px-3'>
                          <FontAwesomeIcon color='#022d7c' className='fa-xl' icon={faCalendarCheck} />
                        </div>
                    </div>
                    <hr />
                    <div>
                      <div className='d-flex justify-content-between'>
                        <h2
                          className='text-primary'
                        >{num.interview}</h2>
                        <h4 className='fw-normal '>Job</h4>
                      </div>
                    </div>
                  </section>
                </div>
                <div className='col mb-3'>
                  <section className='rounded shadow dashboard-stats-declined'>
                  <div className=' d-flex justify-content-between align-items-center'>
                  <h2
                      style={{
                        letterSpacing: '1px'
                      }} className='fw-light '>Declined</h2>
                        <div 
                        style={{backgroundColor: '#ff6b6b'}}
                        className='rounded shadow-sm py-2 px-3'>
                          <FontAwesomeIcon color='#580101' className='fa-xl' icon={faBug} />
                        </div>
                    </div>
                    <hr />
                    <div>
                      <div className='d-flex justify-content-between'>
                        <h2
                          className='text-danger'
                        >{num.declined}</h2>

                        <h4 className='fw-normal '>Job</h4>
                      </div>
                    </div>
                  </section>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Dashboard
