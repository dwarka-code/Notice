import React from 'react'

class Admin extends React.Component{

    constructor(){

        super();
        this.state={

            users: []
        }
        
    }

    fetchUsers(){

        var url = "http://localhost:4000/admin"
        fetch(url)
        .then(res => res.json())
        .then(res => {

            this.setState({

                users: res.data
            })
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

            console.log("mergi baaaaa",data)
            this.fetchUsers()
        })
        .catch(err => console.log(err))
    }

    editUser(id){
         
        this.props.history.push(`/admin/edit/${id}`)
        
        var url = `http://localhost:4000/admin/edit/${id}`
        fetch(url,{
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json'}),

        })
        .then(res => res.json())
        .then(data => {

            console.log("mergi baaaaa",data)
            this.fetchUsers()
            
        })
        .catch(err => console.log(err))
        
    }

    
    
    render(){

    
        return (            
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(users =>{

                                return(
                                    <tr key={users._id}>
                                        <td>{users.email}</td>
                                        <td>{users.name}</td>
                                        <td>
                                            <button onClick={()=> this.editUser(users._id)}>Edit</button>
                                            <button onClick={()=> this.deleteUser(users._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>     
                    </table>
                    
                           
                
        )

    }
}

export default Admin