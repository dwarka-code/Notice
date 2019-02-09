import React from "react";
import Navigation from './Navigation'
import {Row, Col, Grid, ControlLabel, FormControl, Button} from 'react-bootstrap'

import '../style/AddTable.css'


class AddTable extends React.Component{

    constructor(props){

        super(props)
        this.state={

            number_table: '',
            number_people: '',
        }
    }

    addTable = e =>{

        let url = `/guests/addtable`
        fetch(url,{

            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(()=>{

            this.props.history.push("/guests")
        })
        .catch(err => console.log(err))
        e.preventDefault()
    }


    handleChange =(event) =>{

        const {name, value} = event.target
        this.setState({

            [name]: value
        })

        event.preventDefault()
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

                this.props.history.push('/')
            })
    }

    handleClick = (event)=>{

        console.log(event.target.value)
        event.preventDefault()
    }


    render(){

        return (
            <div>
                <Navigation />
                <div className="container">
                
                    <div className="title">
                        <h1>Add Table</h1>
                    </div>
                    <div className="formm">
                        <form onSubmit={this.addTable}>
                            <Grid>
                            <div className="space">
                                    <Row>
                                        <Col xs={12} md={12}>
                                        <Row>
                                            <Col xs={12}>
                                                <i className="fas fa-sort-numeric-up"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Number</ControlLabel>
                                        
                                            </Col>
                                        </Row>
                                            <FormControl
                                                type="number"
                                                name="number_table"
                                                value={this.state.number_table}
                                                placeholder="Number"
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
                                                <i className="fas fa-sort-numeric-up"></i>
                                                &nbsp; &nbsp;
                                            <ControlLabel>Number of people</ControlLabel>
                                        
                                        </Col>
                                                </Row>
                                                <FormControl
                                                    type="number"
                                                    name="number_people"
                                                    value={this.state.number_people}
                                                    placeholder="Number of people"
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

export default AddTable