import { faBars, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useGlobalContext } from '../../Utilities/Context'
import './nav.css'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
    const navigate = useNavigate()
const [dropDown,setDropDown]=useState(false)
    const { changeSideBar, userDetails,updateInfo,showAlert } = useGlobalContext();
    return (
        <nav
        style={{
            borderBottom: 'solid 1px #c7c7c7'
        }}
        className="navbar navbar-expand-lg py-3 sticky-top">
            <div className="container-fluid">
                <div
                style={{width: '100%'}}
                className="d-flex justify-content-between align-items-center">
                    <button
                        onClick={() => {
                            changeSideBar()
                        }}
                        className="my-togg" type="button">
                        <FontAwesomeIcon className='fa-2xl' icon={faBars} />
                    </button>
                        <h2
                        style={{transform: 'translateX(50%)',color: '#3B82F6',letterSpacing: '1px',fontSize: '2.2rem'}}
                        >JOBSTER</h2>

                    <article style={{position: 'relative'}}>
                        <aside
                        onClick={()=> setDropDown(!dropDown)}
                        className='name-drop shadow-sm text-capitalize'>
                        <FontAwesomeIcon className='me-2' icon={faCircleChevronDown} />
                                                {userDetails.name}
                        </aside>
                        <button 
                        onClick={()=>{
                            localStorage.removeItem('lToken')
                            navigate('/')
                            updateInfo({
                                type: '',
                                name: '',
                                myID: ''
                            });
                            showAlert({
                                type: 'success',
                                msg: 'logged out'
                            })
                        }}
                        style={{
                            display: `${dropDown ? 'block' : 'none'}`
                        }}
                        className='shadow-sm name-drop-menu'>
                        Log Out
                        </button>
                    </article>
                </div>
            </div>
        </nav>)
}

export default Nav