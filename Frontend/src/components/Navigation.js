import React from 'react'
import {Link} from 'react-router-dom'

//import '../style/Navigation.css'


//import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col} from 'react-bootstrap'

class Navigation extends React.Component{

    logOut = () =>{

        let url = "/"
        fetch(url,{

            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(),
            headers: new Headers({'Content-Type': 'application/json'})
        },{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{

            this.props.history.push('/')
        })
    }

    render(){

        return(
           <div className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                    <Link to={"/"} className="navbar-brand">Logo</Link>
                    <button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse navHeaderCollapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li ><Link to={"/guests"}>Guests</Link></li>
                            <li ><Link to={"/statistics"}>Statistics</Link></li>
                            <li ><Link to={"/task"}>Tasks</Link></li>
                            <li ><Link to={"/register"}>Register</Link></li>
                        </ul>
                    </div>
                </div>
           </div>

        )
    }
}
export default Navigation