import React from "react";
import Navigation from './Navigation'
import {Row, Col, Grid, ControlLabel, FormControl, Button} from 'react-bootstrap'
import TimePicker from 'react-time-picker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class EditTask extends React.Component{

    constructor(props){

        super(props)
        this.state={

            id: '',
            title: '',
            description: '',
            date: new Date(),
            time: ''

        }

        this.editTask = this.editTask.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.dateChange = this.dateChange.bind(this)
        this.timeChange = this.timeChange.bind(this)
    }

    fetchTask(){

        let id = this.props.match.params.id
        let url = `/task/${id}`
        fetch(url)
        .then(res => res.json())
        .then(res => {

            console.log("MUIEEEEE",res.data.date)
            this.setState({

                id: res.data._id,
                title: res.data.title,
                description: res.data.description,
                date: res.data.date,
                time: res.data.time
            })
        })
        .catch(err => console.log(err))
    }

    editTask(newTask){

        let id = this.props.match.params.id
        let url = `/task/edit/${id}`
        fetch(url,{

            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(()=>{

            this.props.history.push("/task")
        })
        .catch(err => console.log(err))

    }

    handleInput(e){

        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({

            [name]: value
        })
    }

    onSubmit(e){

        const newTask={

            title: this.refs.title.value,
            description: this.refs.description.value,
            date: this.refs.date.value,
            time: this.refs.time.value

        }

        this.editTask(newTask)
        e.preventDefault()
    }


    componentDidMount(){

        this.fetchTask()
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
                    <h1>Edit Task</h1>
                </div>
                <div className="formm">
                    <form onSubmit={this.onSubmit}>
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
                                            ref="title"
                                            value={this.state.title}
                                            placeholder="Title"
                                            onChange={this.handleInput}
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
                                                ref="description"
                                                value={this.state.description}
                                                placeholder="Description"
                                                onChange={this.handleInput}
                                            />
                                        </Col>
                                    </Row>
                            </div>
                            <div className="space">
                                    <Row>
                                        <Col xs={12} md={12} >
                                        <Row>
                                        <Col xs={12}>
                                            <i className="fas fa-calendar-alt"></i>
                                            &nbsp; &nbsp;
                                        <ControlLabel>Date</ControlLabel>
                                    
                                    </Col>
                                            </Row>
                                            <DatePicker
                                                ref="date"
                                                selected={this.state.date}
                                                onChange={this.dateChange}
                                                            
                                            />
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
                                                ref="time"
                                                onChange={this.timeChange}
                                                value={this.state.time} 
                                            />
                                        </Col>
                                    </Row>
                            </div>                                
                        </Grid>
                        <div className="login_button">
                            <Button bsStyle="primary" bsSize="large" type="submit">Edit</Button>
                        </div>
                    </form>
                </div>
            </div>              
        </div>
        )
    }
}

export default EditTask