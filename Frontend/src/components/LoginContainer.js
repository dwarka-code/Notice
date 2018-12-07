import React from "react";

import 'react-toastify/dist/ReactToastify.min.css' 
import {ToastContainer, toast} from 'react-toastify'


class LoginContainer extends React.Component{

    constructor(){

        super()
        this.state={

            email: '',
            password: '',
            message: ''
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
                },()=>{

                    console.log("STATE",this.state)
                })
                if(user.email === ''){
                    
                    console.log(user)
                    //this.setState({message: "Email or password is wrong"})
                    toast.error("Email or password is wrong")
                }
                else{

                    console.log(user)
                    this.props.history.push('/notice')
                }
        })
        .catch(err => console.log(err))
        e.preventDefault()
    }

    handleEvent(e){

        const {name, value} = e.target;
        this.setState({

            [name]: value
        })
    }

    render(){

        return (
            <div>
                <ToastContainer removeCloseButton="true" hideProgressBar = "false" position="top-center" store={toast}/>
                <h5 className="center red">{this.state.message}</h5>
                <h1 className="center">Login</h1>
                <form onSubmit={this.getLogin}>
                    
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEvent} placeholder="Email"/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleEvent} placeholder="Password"/>
                    <button className="btn blue" type="submit" >Login</button>
                    
               </form>
               <a href="/register" className="waves-effect waves-light btn-large right">Register</a>
            </div>
        )
    }
}

export default LoginContainer