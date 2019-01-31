import React from "react";
import Navigation from './Navigation'
import {Row, Col, Grid, ControlLabel, FormControl, Button} from 'react-bootstrap'
import TimePicker from 'react-time-picker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddTask extends React.Component{

    constructor(props){

        super(props)
        this.state={

            title: '',
            description: '',
            date: new Date(),
            time: undefined
        }

        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.dateChange = this.dateChange.bind(this)
        this.timeChange = this.timeChange.bind(this)
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

    timeChange(timp){

        this.setState({time:timp})
    }

    dateChange(dataa){

        this.setState({

            date: dataa
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
                                                required
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
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                </div>
                                <div className="space">
                                        <Row>
                                            <Col xs={12} md={12} >
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <i className="fas fa-calendar-alt"></i>
                                                        &nbsp; &nbsp;
                                                    <ControlLabel>Date</ControlLabel>
                                                    
                                                    </Col>
                                                        <DatePicker
                                                            selected={this.state.date}
                                                            onChange={this.dateChange}
                                                            required
                                                            
                                                        />
                                                </Row>

                                            </Col>
                                        </Row>
                                </div>
                                <div className="space">
                                        <Row>
                                            <Col xs={12} md={12} >
                                            <Row>
                                            <Col xs={12}>
                                                <i className="fas fa-clock"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Time</ControlLabel>
                                        
                                        </Col>
                                                </Row>
                                                <TimePicker
                                                    name="time"
                                                    onChange={this.timeChange}
                                                    value={this.state.time}
                                                    required 
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