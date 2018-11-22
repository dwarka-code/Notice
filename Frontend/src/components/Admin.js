import React from 'react'
import Chart from './Chart'
import {Link} from 'react-router-dom'

class Admin extends React.Component{

    constructor(){

        super();
        this.state={

            users: [],
            age_bigger: 0,
            age_smaller: 0
        }
        
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
                    age_bigger: res.age_bigger,
                    age_smaller: res.age_smaller
    
                })
            }
        })
        .then(()=>{

            console.log(this.state)
        })
    }

    componentDidMount(){

        this.fetchUsers()
    }

    deleteUser(id){

        var url = `http://localhost:4000/admin/delete/${id}`
        fetch(url,{
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),

        })
        .then(res => res.json())
        .then(data => {

            this.fetchUsers()
        })
        .catch(err => console.log(err))
    }

    editUser(id){

        this.props.history.push(`admin/edit/${id}`)
    }



   

    
    
    render(){

    
        return (            

            <div>
                <h5>Numarul personalelor cu varsta peste 18 ani: {this.state.age_bigger}</h5>
                <h5>Numarul personalelor cu varsta sub 18 ani: {this.state.age_smaller}</h5>
            
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
                                            <Link className="btn" to={`/admin/edit/${users._id}`}>Edit</Link>
                                            <button onClick={()=> this.deleteUser(users._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>     
                    </table>
                    <Chart age1={this.state.age_bigger} age2={this.state.age_smaller}/>
                    </div>
                        
                        
            
        )

    }
}

export default Admin