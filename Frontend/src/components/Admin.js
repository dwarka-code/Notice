import React ,{Component} from 'react'
import Chart from './Chart'
import Navigation from './Navigation'

import 'react-toastify/dist/ReactToastify.min.css' 
import {ToastContainer, toast} from 'react-toastify'



class Admin extends Component{

    constructor(){

        super();
        this.state={

            users: [],
            age020: 0,
            age2040: 0,
            age4060: 0,
            agebigger60: 0
        }

        this.deleteUser = this.deleteUser.bind(this)
        
    }

    fetchUsers(){

        var url = "/admin"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res => {

            if(res.logIn === ''){
                
                this.props.history.push('/')
            }
            else{

                this.setState({

                    users: res.data,
                    age020: res.age020,
                    age2040: res.age2040,
                    age4060: res.age4060,
                    agebigger60: res.agebigger60
    
                })
            }
        })
        .then(()=>{

            console.log("STATE",this.state)
        })
    }

    componentDidMount(){

        this.fetchUsers()
    }

    deleteUser(id){

        let url = `/admin/delete/${id}`
        fetch(url,{
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),

        })
        .then(res => res.json())
        .then(data => {

            toast.error("User Deleted")
            this.fetchUsers()
        })
        .catch(err => console.log(err))
    }  
    render(){

    
        return (            

            <div className="">
            <Navigation />  
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(users =>{

                                return(
                                    <tr key={users._id}>
                                        <td>{users.email}</td>
                                        <td>{users.name}</td>
                                        <td>{users.age}</td>
                                        <td>
                                            <button onClick={()=> this.deleteUser(users._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>     
                    </table>
                    <Chart age020={this.state.age020} age2040={this.state.age2040} age4060={this.state.age4060} agebigger60={this.state.agebigger60}/>
                    <ToastContainer removeCloseButton="true" hideProgressBar = "false" position="bottom-center" store={toast}/> 
            </div>
                        
                        
            
        )

    }
}

export default Admin