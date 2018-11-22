import React from 'react'
import {Link} from 'react-router-dom'

class Navigation extends React.Component{

    render(){

        return(

            <div>

                <nav className="blue darken-3">
                    <div className="nav-wrapper">
                    <div className="brand-logo">Logo</div>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <Link className="btn blue" to={`/`}>Home</Link>
                        <Link className="btn blue" to={`/register`}>Register</Link>
                        <Link className="btn blue" to={`/notice`}>Notice</Link>
                    </ul>
                    </div>
                </nav>

            </div>
        )
    }
}
//in loc de href trebuie sa pun un onClick care sa imi spuna daca e login sau nu si dupa dau un return false;

export default Navigation