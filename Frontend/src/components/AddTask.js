import React from "react";
import Navigation from './Navigation'

class AddTask extends React.Component{

    constructor(props){

        super(props)
        this.state={

            title: '',
            description: ''
        }

        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    addTask(e){

        let url = `/task/addtask`
        fetch(url,{

            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(()=>{

            this.props.history.push("/task")
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


    render(){

        return (
            <div>
                <Navigation />
                <h1 className="center">Add Task</h1>
                <form onSubmit={this.addTask}>                  
                    <input type="text" name="title" onChange={this.handleChange} placeholder="Title"/>
                    <input type="text" name="description" onChange={this.handleChange} placeholder="Description"/>
                    <input type="date" name="date" onChange={this.handleChange} placeholder="Date"/>
                    <input className="btn" type="submit" value="Add" />
                </form>
               
            </div>
        )
    }
}

export default AddTask