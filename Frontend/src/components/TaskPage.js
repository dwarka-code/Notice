import React from 'react';
import Navigation from './Navigation'
import {Link} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import {Button, Row, Col, Table, } from 'react-bootstrap'

import '../style/TaskPage.css'

class TaskPage extends React.Component{

    constructor(props){

        super(props);
        this.state={

            tasks: [],
            name: '',
            dates: [],
            lungime: 0,
            message: '',
            isLogin: true,
            status: '',
        }

        this.logOut = this.logOut.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.editNotice=this.editNotice.bind(this)
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

            console.log(res.status)
            this.props.history.push('/')
        })
    }
    

    fetchTask(){

        
        var url = "/task"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{
            if(res.logIn === ''){

                this.props.history.push('/')    
            }else{
               
                this.setState({
              
                    tasks: res.data,
                    name: res.name,
                    dates: res.date,
                    lungime: res.lungime,
                    message: ''
                }, function(){
                    
                    console.log("STATE",this.state)
                })
                console.log("LUNGIME:",this.state.lungime)
                if(this.state.lungime === 0){

                    this.setState({message: "Not tasks"})


                }
                console.log("MESSAGE:",this.state.message)
            }
        })
    }

    componentDidMount(){


        this.fetchTask()

    }

    deleteTask(id){

        let url = `/task/delete/${id}`
        fetch(url,{
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),

        })
        .then(res => res.json())
        .then(data => {

            toast.error("Task Deleted")
            this.fetchTask()
        })
        .catch(err => console.log(err))
    }  

    editNotice(id){

        console.log(id)
        this.props.history.push(`/task/edit/${id}`)
    }

    render(){
        return(
          
            <div>
                <Navigation/>
                    <div>
                        <div className="logout_button">
                            <Button bsSize="large" bsStyle="danger" onClick={this.logOut}>Log out</Button>
                        </div>
                        <div className="hello">
                                <h2>Hello, {this.state.name}</h2>
                            </div>
                        <div className="container">
                            <div className="task">
                                <h1>Task</h1>
                            </div>
                            <div className="notask">
                                <h3>{this.state.message}</h3>
                            </div>

                            <div className="addtask">
                                <Link to={`/task/addtask`}><i className="fas fa-plus"></i></Link>
                            </div>
                            <div >
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Table responsive={true} hover={true}> 
                                                <thead>
                                                    <tr>
                                                    <th></th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.tasks.map((tasks,i) =>{

                                                        return(
                                                            <tr key={tasks._id}>
                                                                <td>{i+1}</td>
                                                                <td>{tasks.title}</td>
                                                                <td>{tasks.description}</td>
                                                                <td>{tasks.date}</td>
                                                                <td><Button onClick={()=> this.deleteTask(tasks._id)} bsStyle="danger">Delete</Button></td>
                                                                <td><Button onClick={()=> this.editNotice(tasks._id)} bsStyle="warning">Edit</Button></td>
                                                                
                                                            </tr>
                                                        )
                                                    })}
                                                    
                                                </tbody>
                                            </Table>                                                                                         
                                        </Col>
                                    </Row>
                            </div>
                        </div>
                    </div>                       
            </div>
                          
        )
    }
}

export default TaskPage

