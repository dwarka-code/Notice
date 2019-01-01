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
        }
    }

    fetchGuests(){

        
        let url = "/guests"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{
            if(res.logIn === ''){

                this.props.history.push('/')    
            }else{
               
                console.log(res.data)
                this.setState({
              
                    guests: res.data
                }, function(){
                    
                    console.log("STATE GUEST",this.state)
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
    render(){


        return(
                    <div>
                            <Navigation />
                            <div className="main">
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
                                               <div className="circle"></div>
                                            </Col>
                                            <Col xs={3} md={2}>
                                                    <div className="lista">
                                                            <ListGroup>                                                              
                                                                {this.state.guests.map((guests, i)=>(
                                                                    <Draggable
                                                                        onDrag={this.handleDrag}
                                                                        bounds={{left:-1700, top:10, right:0, bottom: 1000}}
                                                                    >
                                                                            <ListGroupItem key={guests._id}>{guests.name}</ListGroupItem>
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

