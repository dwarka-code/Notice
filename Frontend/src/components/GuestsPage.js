import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import Circle from './Circle'
import Patrat from './Patrat'
import {Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import '../style/GuestPage.css'

class GuestsPage extends Component{

    constructor(){
        
        super()
        this.state={

            guests: [],
            tables: [],
            asezati: [],
            draggedGUest: {},
            search: '',
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

    onDragOver = e =>{

        e.preventDefault()
    }

    onDrag = (ev, guest) =>{

        ev.preventDefault()
        this.setState({

            draggedGUest: guest
        })
    }

    onDrop = (e)=>{

        e.preventDefault()
       const {asezati, draggedGUest, guests} = this.state

       this.setState({

        asezati: [...asezati, draggedGUest],
        guests: guests.filter(guest => guest._id !==draggedGUest._id),
        draggedGUest: {}
       })
    }

    render(){
        let filterGuests = this.state.guests.filter((guests) =>{

            return guests.name.indexOf(this.state.search) !== -1
        })

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
                                                            
                                                            <div key={i} className="parent" onDrop={(e)=> this.onDrop(e)} onDragOver={(e)=>this.onDragOver(e)}>

                                                                <div className="center">
                                                                    <Circle key={table._id} numberTable={table.number} asezati={this.state.asezati}/>
                                                                </div>                                                                                                                     
                                                                <div className="child">
                                                                    {Array.from(Array(parseInt(table.number_of_people))).map((item, index) =>
                                                                        (<Patrat key={index} asezati={this.state.asezati} />)
                                                                         )}
                                                                </div>
                                                                
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
                                                                   
                                                                    <ListGroupItem onDrag={(e)=>this.onDrag(e, guests)} draggable key={guests._id}><h4>{guests.name} &nbsp;&nbsp; {guests.status}</h4></ListGroupItem>
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

