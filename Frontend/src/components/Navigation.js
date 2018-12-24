import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

import '../style/Navigation.css'

//import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col} from 'react-bootstrap'

class Navigation extends React.Component{

    render(){

        return(
            <Row>
                <Col xs={12} md={12}>
                    <nav className="list">
                        <ul>
                            <li className="logo"><h4>Logo</h4></li>
                            <li><Link to="/task">Tasks</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/">Login</Link></li>    
                        </ul>
                    </nav>
                </Col>
            </Row>

        )
    }
}
export default Navigation