import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/landing.css'
const Landing = () => {
  return (
    <article className='landing'>
      <div className='landing-center'>
        <section className='row row-cols-1 row-cols-md-2'>
          <div className='col'>
            <div
            style={{height: '100%'}}
            className="d-flex flex-column justify-content-between">
              <div className='mb-4 mb-md-0'>
                <h1
                  style={{ color: '#fff', backgroundColor: '#3B82F6', width: 'fit-content', padding: '.2rem 1rem' }}
                  className='me-2 m-0 d-inline rounded shadow-sm'>J
                </h1>
                <h2
                  style={{ color: '#3b82f6' }}
                  className='m-0 d-inline'>Jobster
                </h2>
              </div>
              <div className='text-cont mb-4 mb-md-0'>
                <h1 className='mb-4 mb-md-0'>
                  Job <span style={{ color: '#3B82F6' }}>Tracking</span> App
                </h1>
                <p>A simple App where you can post a job, and allow employees to apply for it, and track their stats.</p>
                <p>All the information is encrypted and securley saved within our database.</p>
              </div>
              <Link
              to='/login'
              className='my-start-btn'>Login/Register
              </Link>
            </div>
          </div>
          <div className='col'>
            <img
            src='https://redux-toolkit-jobster.netlify.app/static/media/main.17b316de742b3a1202078c5ae18c8261.svg' className='d-none d-md-block img-fluid d-flex ms-auto' width='550px' />
          </div>
        </section>
      </div>
    </article>
  )
}

export default Landing
