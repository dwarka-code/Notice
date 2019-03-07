import React from "react";
import {Link} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

import 'react-toastify/dist/ReactToastify.min.css' 
import {ToastContainer, toast} from 'react-toastify'

import '../style/Login.css'

import {Button, ControlLabel, FormControl, Grid, Row,Col} from 'react-bootstrap'


class LoginContainer extends React.Component{

    constructor(){

        super()
        this.state={

            email: '',
            password: '',
            message: '',
            value: '',
            isLogIn: false,
            name: '',
        }

        this.getLogin = this.getLogin.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
    }

    getLogin(e){

        let url = `/login`
        fetch(url,{

            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(user =>{

                this.setState({

                    email: user.email,
                    password: user.password,
                })
                if(user.email === ''){
                    
                    console.log(user)

                    this.setState({message: "Email or password is wrong"})
                    //toast.error("Email or password is wrong")
                }
                else{

                    console.log(user)
                    this.props.history.push('/guests')
                }
        })
        .catch(err => console.log(err))
        e.preventDefault()
    }

    handleEvent(e){

        const {name, value} = e.target;
        this.setState({

            [name]: value,
            value: e.target.value
        })
    }

      getValidationState() {
        const length = this.state.value.length;
        if (length > 10)
            return 'success';
        else if (length > 5)
            return 'warning';
        else if (length > 0)
            return 'error';
        return null;
      }

    componentClicked = () =>{

        console.log("click")
    }

    responseFacebook = response =>{

        console.log(response)

        this.setState({

            email: response.email
        },()=>{

            console.log("FACEBOOK STATE",this.state)
        })
        

        this.props.history.push('/guests')
    }
/*
    <div className="facebook">
    {fbContent}
</div>
*/

    render(){

        let fbContent

        if(this.state.isLogIn){
            fbContent = null

        }
        else{

            fbContent = (<FacebookLogin
                appId="221786842098988"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} /> )
        }
        return (
            <div className="container">

                <ToastContainer removeCloseButton="true"  position="top-center" store={toast}/>
                <div className="error_message">
                    <h5>{this.state.message}</h5>
                </div>
                
                <div className="title">
                    <h1>Login</h1>
                </div>
                <div className="formm">
                    <form onSubmit={this.getLogin}>
                        <Grid>
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
                                                autoComplete="current-password"
                                                value={this.state.password}
                                                placeholder="Password"
                                                onChange={this.handleEvent}
                                            />
                                        </Col>
                                    </Row>
                            </div>                   
                        </Grid>
                        <div className="login_button">
                            <Button bsStyle="success" bsSize="large" type="submit">Log in</Button>
                        </div>
                    </form>
                </div>

                <div className="register">
                    <Link to={`/register`}>Register</Link>
                    {fbContent}
                </div>
            
            </div>     

        )
    }
}

export default LoginContainer