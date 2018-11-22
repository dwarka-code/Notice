import React from "react";


class RegisterContainer extends React.Component{

    constructor(){

        super()
        this.state={

            email: '',
            password: '',
            name: '',
            age:'',
            message:''
        }

        this.addUser = this.addUser.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
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

                this.props.history.push("/admin") 
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
             <h5 className="center red">{this.state.message}</h5>
             <h1 className="center">Register</h1>
               <form onSubmit={this.addUser}>

                    
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEvent} placeholder="Email"/>
                    <input type="text" name="password" value={this.state.password}onChange={this.handleEvent} placeholder="Password"/>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleEvent} placeholder="Name"/>
                    <input type="text" name="age" value={this.state.age} onChange={this.handleEvent} placeholder="Age"/>
                    <button className="btn blue" type="submit" >Register</button>
                    
               </form>
            </div>
        )
    }
}

export default RegisterContainer