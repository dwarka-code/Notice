import React from "react";
import {Button, FormGroup, ControlLabel, FormControl, Grid, Row,Col} from 'react-bootstrap'

import '../style/Register.css'

class RegisterContainer extends React.Component{

    constructor(){

        super()
        this.state={

            email: '',
            password: '',
            name: '',
            age:'',
            message:'',

        }

        this.addUser = this.addUser.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    addUser(e){

        let url = `/register`
        fetch(url,{

            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => {
            if(data.email === ''){

                this.setState({

                    message: 'User already exists!'
                })
            }
            else{
                this.props.history.push("/") 
            }
        })

        .catch(err => console.log(err))
        e.preventDefault()
    }

    handleEvent(e){

        const {name, value} = e.target;
        this.setState({

            [name]: value,
        })
    }

    handleChange(e){

        this.setState({

            password: e.target.value
        })
    }

    onChangeHandler = event =>{

        this.setState({

            selectedFile: event.target.files[0]
        })
    }

    getValidationState() {
        const length = this.state.password.length;
        if (length > 10)
            return 'success';
        else if (length > 5)
            return 'warning';
        else if (length > 0)
            return 'error';
        return null;
      }
    render(){

        return (
                        
            <div className="container">
                <div className="error_message">
                    <h5>{this.state.message}</h5>
                </div>
                <div className="title">
                    <h1>Register</h1>
                </div>
                <div className="formm">
                    <form onSubmit={this.addUser}>
                        <Grid>
                            <div className="space">
                                <Row>
                                    <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12}>
                                            <i className="fas fa-user"></i>
                                            &nbsp; &nbsp;
                                        <ControlLabel>Name</ControlLabel>
                                     
                                    </Col>
                                    </Row>
                                        <FormControl
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            value={this.state.name}
                                            placeholder="Name"
                                            onChange={this.handleEvent}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="space">                               
                                <Row>
                                    <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12}>
                                            <i className="fas fa-user"></i>
                                            &nbsp; &nbsp;
                                        <ControlLabel>Age</ControlLabel>
                                     
                                    </Col>
                                    </Row>
                                        <FormControl
                                            type="number"
                                            name="age"
                                            autoComplete="age"
                                            value={this.state.age}
                                            placeholder="Age"
                                            onChange={this.handleEvent}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="space">
                                <Row>
                                    <Col xs={12} md={12}>
                                    <Row>
                                        <Col xs={12}>
                                            <i className="far fa-envelope"></i>
                                            &nbsp; &nbsp;
                                        <ControlLabel>Email</ControlLabel>
                                     
                                    </Col>
                                    </Row>
                                        <FormControl
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={this.state.email}
                                            placeholder="Email"
                                            onChange={this.handleEvent}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="space">
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationState()}
                                >
                                    <Row>
                                        <Col xs={12} md={12} >
                                        <Row>
                                        <Col xs={12}>
                                            <i className="fas fa-unlock-alt"></i>
                                            &nbsp; &nbsp;
                                        <ControlLabel>Password</ControlLabel>
                                     
                                    </Col>
                                            </Row>
                                            <FormControl
                                                type="password"
                                                name="password"
                                                autoComplete="password"
                                                value={this.state.password}
                                                placeholder="Password"
                                                onChange={this.handleEvent}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </div>
                        </Grid>
                        <FormControl.Feedback />
                        <div className="register_button">
                            <Button bsStyle="primary" type="submit">Register</Button>
                        </div>
                    </form>
                </div>
                
        </div>     
        )
    }
}

export default RegisterContainer