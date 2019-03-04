import React from "react";
import Navigation from './Navigation'
import {Row, Col, Grid, ControlLabel, FormControl, Button} from 'react-bootstrap'

import '../style/AddGuest.css'


class AddGuest extends React.Component{

    constructor(props){

        super(props)
        this.state={

            name: '',
            age: '',
            status: ''
        }
    }

    addGuest = e =>{

        let url = `/guests/addguest`
        fetch(url,{

            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(()=>{

            this.props.history.push("/guests")
        })
        .catch(err => console.log(err))
        e.preventDefault()
    }


    handleChange =(event) =>{

        const {name, value} = event.target
        this.setState({

            [name]: value
        })

        event.preventDefault()
    }

    logOut(){

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

    handleClick = (event)=>{

        console.log(event.target.value)
        event.preventDefault()
    }


    render(){

        return (
            <div>
                <Navigation />
                <div className="logout_button">
                    <Button bsSize="large" bsStyle="danger" onClick={this.logOut}>Log out</Button>
                </div>
                <div className="container">
                
                    <div className="title">
                        <h1>Add Guest</h1>
                    </div>
                    <div className="formm">
                        <form onSubmit={this.addGuest}>
                            <Grid>
                            <div className="space">
                                    <Row>
                                        <Col xs={12} md={12}>
                                        <Row>
                                            <Col xs={12}>
                                                <i className="fas fa-user-circle"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Name</ControlLabel>
                                        
                                            </Col>
                                        </Row>
                                            <FormControl
                                                type="text"
                                                name="name"
                                                value={this.state.name}
                                                placeholder="Name"
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="space">
                                        <Row>
                                            <Col xs={12} md={12} >
                                            <Row>
                                            <Col xs={12}>
                                                <i className="fas fa-arrow-circle-right"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Age</ControlLabel>
                                        
                                        </Col>
                                                </Row>
                                                <FormControl
                                                    type="text"
                                                    name="age"
                                                    value={this.state.age}
                                                    placeholder="Age"
                                                    onChange={this.handleChange}
                                                />
                                            </Col>
                                        </Row>
                                </div>
                                <div className="space">
                                        <Row>
                                            <Col xs={12} md={12} >
                                            <Row>
                                            <Col xs={12}>
                                                <i className="fas fa-question-circle"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Status</ControlLabel>
                                        
                                        </Col>
                                                </Row>

                                                <select name="status" value={this.state.status} onChange={this.handleChange} >
                                                    <option value="">--Please choose an option--</option>
                                                    <option value="vine">&#xf00c; Vine</option>
                                                    <option value="nu vine">&#xf00d; Nu vine</option>
                                                    <option value="nu stie">&#xf128; Nu stie</option>
                                                </select>
                                                
                                            </Col>
                                        </Row>
                                </div>                                
                            </Grid>
                            <div className="login_button">
                                <Button bsStyle="primary" bsSize="large" type="submit">Add</Button>
                            </div>
                        </form>
                    </div>
                </div>              
            </div>
        )
    }
}

export default AddGuest