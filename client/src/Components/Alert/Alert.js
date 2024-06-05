import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import './alert.css'
import { useGlobalContext } from '../../Utilities/Context'
const Alert = () => {
    const { alert, hideAlert } = useGlobalContext();
    const { type, msg } = alert
    useEffect(()=>{
        const getTime = setTimeout(() => {
            hideAlert();
        }, 2000);
        return ()=> clearTimeout(getTime);
    },[alert.condition])
    return (
        <aside
            className={`my-alert shadow-sm ${alert.condition ? 'show-alert' : 'hide-alert'}
        ${(type === 'success') ? 'alert-success-border' : ''} ${(type === 'danger') ? 'alert-danger-border' : ''}
        `}>
            <article className='alert-content'>
                <p className={`mb-0  ${(type === 'success') ? 'alert-success-text' : ''} ${(type === 'danger') ? 'alert-danger-text' : ''} `}>
                    <FontAwesomeIcon className='me-2' icon={faCircleExclamation} />
{msg}
                </p>

                <button
                    onClick={hideAlert}
                    type="button" className={`alert-close-container ${(type === 'success') ? 'alert-success-text' : ''} ${(type === 'danger') ? 'alert-danger-text' : ''}`}>
                    <FontAwesomeIcon className='alert-close-btn' icon={faXmark} />
                </button>

            </article>
        </aside>
    )
}

export default Alert