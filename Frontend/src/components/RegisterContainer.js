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

            /*<div>
             <h5 className="center red">{this.state.message}</h5>
             <h1 className="center">Register</h1>
               <form onSubmit={this.addUser}>

                    
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEvent} placeholder="Email"/>
                    <input type="text" name="password" value={this.state.password}onChange={this.handleEvent} placeholder="Password"/>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleEvent} placeholder="Name"/>
                    <input type="text" name="age" value={this.state.age} onChange={this.handleEvent} placeholder="Age"/>
                    <input type="file" name="myImage"/>
                    <button className="btn blue" type="submit" >Register</button>
                    
               </form>
            </div> */

            <div>
                <h5 className="center red">{this.state.message}</h5>
                <h1 className="center">Register</h1>
                <div className="row">
                    <form className="col s12" onSubmit={this.addUser}>

                    <div className="row">
                        <div class="input-field col s5">
                            <input name="name" value={this.state.name} onChange={this.handleEvent} type="text" className="validate" />
                            <label for="Name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div class="input-field col s5">
                            <input name="age" value={this.state.age} onChange={this.handleEvent} type="number" class="validate" />
                            <label for="Age">Age</label>
                        </div>
                    </div>

                    <div className="row">
                        <div class="input-field col s5">
                            <input name="email" value={this.state.email} onChange={this.handleEvent} type="text" class="validate" />
                            <label for="Email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                         <div class="input-field col s5">
                            <input name="password" value={this.state.password}onChange={this.handleEvent} type="password" class="validate" />
                                <label for="password">Password</label>
                         </div>
                    </div>
                    <button className="btn blue" type="submit" >Register</button>
                    </form>
                
                </div>
            </div>
                        

        )
    }
}

export default RegisterContainer