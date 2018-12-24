import React from "react";
import Navigation from './Navigation'
import {Row, Col, Grid, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class AddTask extends React.Component{

    constructor(props){

        super(props)
        this.state={

            title: '',
            description: '',
            date: ''
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
                <div className="container">

                    <div className="title">
                        <h1>Add Task</h1>
                    </div>
                    <div className="formm">
                        <form onSubmit={this.addTask}>
                            <Grid>
                            <div className="space">
                                    <Row>
                                        <Col xs={12} md={12}>
                                        <Row>
                                            <Col xs={12}>
                                                <i className="far fa-envelope"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Title</ControlLabel>
                                        
                                            </Col>
                                        </Row>
                                            <FormControl
                                                type="text"
                                                name="title"
                                                value={this.state.title}
                                                placeholder="Title"
                                                onChange={this.handleChange}
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
                                            <ControlLabel>Description</ControlLabel>
                                        
                                        </Col>
                                                </Row>
                                                <FormControl
                                                    type="text"
                                                    name="description"
                                                    value={this.state.description}
                                                    placeholder="Description"
                                                    onChange={this.handleChange}
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
                                            <ControlLabel>Date</ControlLabel>
                                        
                                        </Col>
                                                </Row>
                                                <FormControl
                                                    type="date"
                                                    name="date"
                                                    value={this.state.date}
                                                    placeholder="Date"
                                                    onChange={this.handleChange}
                                                />
                                            </Col>
                                        </Row>
                                </div>                                
                            </Grid>
                            <div className="login_button">
                                <Button bsStyle="primary" bsSize="large" type="submit">Add</Button>
                            </div>
                        </form>
                    </div>
                </div>              
            </div>
        )
    }
}

export default AddTask