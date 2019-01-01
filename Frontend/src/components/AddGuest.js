import React from "react";
import Navigation from './Navigation'
import {Row, Col, Grid, ControlLabel, FormControl, Button} from 'react-bootstrap'


class AddGuest extends React.Component{

    constructor(props){

        super(props)
        this.state={

            name: '',
            age: '',
            status: ''
        }

        this.addGuest = this.addGuest.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    addGuest(e){

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


    handleChange(e){

        
        const {name, value} = e.target
        this.setState({

            [name]: value
        })
    }

    logOut(){

        let url = "/"
        fetch(url,{

            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        },{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{

            this.props.history.push('/')
        })
    }


    render(){

        return (
            <div>
                <Navigation />
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
                                                <i className="far fa-envelope"></i>
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
                                                <i className="fas fa-unlock-alt"></i>
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
                                                <i className="fas fa-unlock-alt"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Status</ControlLabel>
                                        
                                        </Col>
                                                </Row>
                                                <FormControl
                                                    type="text"
                                                    name="status"
                                                    value={this.state.status}
                                                    placeholder="Status"
                                                    onChange={this.handleChange}
                                                />
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