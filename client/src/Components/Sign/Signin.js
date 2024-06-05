import React from 'react'

const Signin = () => {
    // sign up
    return (
        <div className='form-con shadow rounded'>
            <h2 className='mb-4 text-primary fs-1 text-center'>Sign Up Form</h2>
            <div class="form-floating mb-3">
                <input type="name" class="form-control" id="floatingInput" placeholder="Muhammad" />
                <label for="floatingInput">Name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>
            <div id="passwordHelpBlock" class="form-text mb-4">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>
            <div className='d-flex'>
                <button type="button" class="sign-btn rounded shaodw-sm">button</button>
            </div>

        </div>
    )
    // sign in
//     <div className='form-con shadow rounded'>
//     <h2 className='mb-4 text-primary fs-1 text-center'>Sign In Form</h2>
//     <div class="form-floating mb-3">
//         <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
//         <label for="floatingInput">Email address</label>
//     </div>
//     <div class="form-floating mb-3">
//         <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
//         <label for="floatingPassword">Password</label>
//     </div>
//     <div id="passwordHelpBlock" class="form-text mb-4">
//         Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
//     </div>
//     <div className='d-flex'>
//         <button type="button" class="sign-btn rounded shaodw-sm">button</button>
//     </div>

// </div>

}

export default Signin
