import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import {Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap'

import Draggable from 'react-draggable'; 


import '../style/GuestPage.css'

class GuestsPage extends Component{

    constructor(){
        
        super()
        this.state={

            guests: [],
            allguests: [],
            search: ""
        }

        this.handleSearch = this.handleSearch.bind(this)
    }

    fetchGuests(){

        
        let url = "/guests"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{
            if(res.logIn === ''){

                this.props.history.push('/')    
            }else{
               
                this.setState({
              
                    guests: res.data,
                    allguests: res.data
                })
            }
        })
    }


    componentDidMount(){

        this.fetchGuests()
    }
    handleDrag(){

        console.log("BINEEE")
    }
    clickMe(){

        console.log("MUIE")
        return(
            <div>
                <ul>
                    <li>Poli</li>
                    <li>Steaua</li>
                    <li>Dinamo</li>
                </ul>
            </div>
        )
    }

    handleSearch = (event) =>{

        event.preventDefault()
        this.setState({

            search: event.target.value,
            guests: this.state.allguests.filter((guest)=> new RegExp(event.target.value, "i").exec(guest.name))
        })

    }

    render(){


        return(
                    <div>
                            <Navigation />
                            <div>
                            <div className="logout_button">
                                <Button bsSize="large" bsStyle="danger" onClick={this.logOut}>Log out</Button>
                            </div>
                            <div className="addtask">
                                <Link to={`/guests/addguest`}><i className="fas fa-plus"></i></Link>
                            </div>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Row>
                                            <Col xs={9} md={10}>                          
                                               <div className="circle" onClick={this.clickMe}>

                                               </div>
                                            </Col>
                                            <Col xs={3} md={2}>
                                                    <div className="lista">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            value={this.state.search}
                                                            onChange={this.handleSearch}
                                                        /> 
                                                            <ListGroup >                                                              
                                                                {this.state.guests.map((guests, i)=>(
                                                                    <Draggable
                                                                        onDrag={this.handleDrag}
                                                                        bounds={{left:-1700, top:10, right:0, bottom: 1000}}
                                                                        key={guests._id}
                                                                    >
                                                                            <ListGroupItem className="listaa"><h5>{guests.name}</h5> &nbsp;&nbsp;&nbsp;&nbsp; <h5>{guests.status}</h5></ListGroupItem>
                                                                    </Draggable>
                                                                ))}
                                                            </ListGroup>
                                                    </div> 
                                            </Col>
                                        </Row>                              
                                    </Col>
                                </Row>
                            </div>
                    </div>

        )
    }
}

export default GuestsPage

