import { useEffect, useRef, useState } from 'react'
import { faAngleDown, faChartSimple, faIdCard, faMagnifyingGlassChart, faRectangleList, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useGlobalContext } from '../../Utilities/Context'
import './side.css'
import { Link } from 'react-router-dom'
const Side = () => {
    const {
        sideBar
    } = useGlobalContext();
    const linksContainer1 = useRef(null)
    const link1 = useRef(null)
    const linksContainer2 = useRef(null)
    const link2 = useRef(null)
    const sidebar = useRef(null)
    const [showLinks1, setShowLinks1] = useState(false)
    const [showLinks2, setShowLinks2] = useState(false)
    useEffect(() => {
        if (showLinks1) {
            const linksHeight1 = link1.current.getBoundingClientRect().height;
            linksContainer1.current.style.height = `${linksHeight1}px`
        }
        else {
            linksContainer1.current.style.height = `0px`
        }
    }, [showLinks1]);
    useEffect(() => {
        if (showLinks2) {
            const linksHeight2 = link2.current.getBoundingClientRect().height;
            linksContainer2.current.style.height = `${linksHeight2}px`
        }
        else {
            linksContainer2.current.style.height = `0px`
        }
    }, [showLinks2]);
    useEffect(() => {
        if (sideBar) {
            sidebar.current.style.width = `232px`
            sidebar.current.style.opacity = `1`
        } else {
            sidebar.current.style.width = `0`
        }
    }, [sideBar]);
    return (
        <aside
        style={{
            borderRight: 'solid 1px #c7c7c7'
        }}

            className='my-sidebar'
            ref={sidebar}
        >
            <header
                className='d-flex justify-content-start align-items-center px-2'>
                    <div class="log me-2">
                        <h1 className='m-0 text-white'>J</h1>
                    </div>
                <h2 className='m-0'>Jobster</h2>
{/* 
                <button
                    onClick={() => hideSideBar()}
                    type="button" class="btn btn-default">
                    <FontAwesomeIcon className='my-xmark fa-lg' icon={faXmark} />
                </button> */}
            </header>

            <div className='sidebar-center'>
                <section>
                    <ul class="list-group">
                        <Link className="list-group-item"
                        to='/dashboard'
                        >
                        <FontAwesomeIcon className='me-2' icon={faChartSimple} />                            Stats</Link>
                        <Link className="list-group-item"
                        to='/alljobs'
                        >
                            <FontAwesomeIcon className='me-2' icon={faMagnifyingGlassChart} />
                            All Jobs</Link>
                        <Link className="list-group-item"
                        to='/addjob'
                        >
                            <FontAwesomeIcon className='me-2' icon={faRectangleList} />
                            Add Job</Link>
                        <Link
                        to='/profile'
                        className="list-group-item">
                        <FontAwesomeIcon
                        className='me-2'
                        icon={faIdCard} />
                            Profile</Link>
                        <li
                            onClick={() => setShowLinks1(!showLinks1)}
                            className='list-group-dropdown d-flex justify-content-between'><p className='m-0'>dropdown</p>
                            <span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </li>
                        <div className='links-container' ref={linksContainer1}>
                            <ul
                                className="my-list-group"
                                ref={link1}
                            >
                                <li
                                    class="my-list-group-item">Item 1</li>
                                <li
                                    class="my-list-group-item">Item 2</li>
                                <li
                                    class="my-list-group-item">Item 3</li>
                            </ul>
                        </div>
                        <li
                            onClick={() => setShowLinks2(!showLinks2)}
                            className='list-group-dropdown d-flex justify-content-between'><p className='m-0'>dropdown</p>
                            <span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </li>
                        <div className='links-container' ref={linksContainer2}>
                            <ul
                                className="my-list-group"
                                ref={link2}
                            >
                                <li
                                    class="my-list-group-item">Item 1</li>
                                <li
                                    class="my-list-group-item">Item 2</li>
                                <li
                                    class="my-list-group-item">Item 3</li>
                            </ul>
                        </div>
                    </ul>
                </section>
            </div>
        </aside>
    )
}

export default Side