import React from 'react'

class Navigation extends React.Component{

    render(){

        return(

            <div>

                <nav className="blue darken-3">
                    <div className="nav-wrapper">
                    <div className="brand-logo">Logo</div>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/notice">Notice</a></li>
                    </ul>
                    </div>
                </nav>

            </div>
        )
    }
}

export default Navigation