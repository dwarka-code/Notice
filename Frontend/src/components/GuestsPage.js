import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import Circle from './Circle'
import Patrat from './Patrat'
import {Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap'

import Draggable from 'react-draggable';


import '../style/GuestPage.css'

class GuestsPage extends Component{

    constructor(){
        
        super()
        this.state={

            guests: [],
            tables: [],
            search: '',
            points: 5
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
                this.setState({
              
                    guests: res.data,
                    tables: res.data1,
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

    handleSearch = (event)=>{

        this.setState({

            search: event.target.value,
        })

    }
    logOut = e =>{

        let url = "/"
        fetch(url,{

            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(),
            headers: new Headers({'Content-Type': 'application/json'})
        },{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{

            this.props.history.push('/')
        })
        e.preventDefault()
    }

    render(){
        let filterGuests = this.state.guests.filter((guests) =>{

            return guests.name.indexOf(this.state.search) !== -1
        })
// {Array.from(Array(this.state.points)).map((x, index) => <Circle key={index} />)}
// {Array.from(Array(this.state.points)).map((x, index) => <Patrat key={index} />)}
        return(
                    <div>
                            <Navigation />
                            <div>
                            <div className="logout_button">
                                <Button bsSize="large" bsStyle="danger" onClick={this.logOut}>Log out</Button>
                            </div>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Row>
                                            <Col xs={9} md={10}>
                                            <div className="addtable">                          
                                                <Link to={`/guests/addtable`} style={{fontSize: 40}}><i className="fas fa-plus"></i></Link>
                                            </div>
                                                          
                                                    {this.state.tables.map((table, i)=>(
                                                        <div key={table._id}>
                                                        
                                                            <Circle numberTable={table.number}/>                                                            
                                                            {Array(6).fill(<Patrat />)}
                                                            
                                                        </div>
                                                    ))}
                                                    

                                                    
                                            </Col>
                                            <Col xs={3} md={2}>
                                                    <div>
                                                        <Link to={`/guests/addguest`} style={{fontSize: 40}}><i className="fas fa-plus"></i></Link>
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            value={this.state.search}
                                                            onChange={this.handleSearch}
                                                        /> 
                                                            <ListGroup >                                                              
                                                                {filterGuests.map((guests)=>(
                                                                    <Draggable
                                                                        onDrag={this.handleDrag}
                                                                        bounds={{left:-1700, top:10, right:0, bottom: 1000}}
                                                                        key={guests._id}
                                                                    >
                                                                        <ListGroupItem ><h4>{guests.name} &nbsp;&nbsp; {guests.status}</h4></ListGroupItem>
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

