import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import Circle from './Circle'
import {Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import Patrat from './Patrat'
import {ToastContainer, toast} from 'react-toastify'
import { Draggable, Droppable } from 'react-drag-and-drop'

import '../style/GuestPage.css'

import $ from 'jquery'

class GuestsPage extends Component{

    constructor(){
        
        super()
        this.state={

            guests: [],
            tables: [],
            asezati: [],
            draggedGUest: {},
            search: ''
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

    onDrop = (e, id)=>{
        let url = '/guests'
       const {asezati, draggedGUest, guests} = this.state

       this.setState({

        asezati: [...asezati, draggedGUest],
        guests: guests.filter(guest => guest._id !==draggedGUest._id),
        draggedGUest: {}
       }, function(){
           console.log("Oameni ce nu sunt asezati: ",this.state.guests)
        console.log("Asezati",this.state.asezati)
        this.state.tables.map((table)=>{    
            if(table._id === id){
                table.people.push(draggedGUest)             
                let data = {
                    asezati: table.people,
                    id: table._id,
                    oameni: this.state.guests
                }
                let p = parseInt(data.asezati.length)
                let q = parseInt(table.number_of_people)             
                if(p >= q){
                    console.log("Masa e plina, nu mai pot sa adaug")                   
                    $(document.body).bind("dragover", function(e) {
                        e.preventDefault();
                        return false;
                    });
                    $(document.body).bind("drop", function(e){
                        e.preventDefault();
                        console.log("GATA BA, nu mai poti sa adaugi")
                        toast.error("The table is full")
                        return false;
                    });          
                }
                else{
                    console.log("Mai poti sa adaugi oameni la masa")
                }
                fetch(url,{
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify(data),
                    headers: new Headers({'Content-Type': 'application/json'})
                    },{ credentials: 'include'})
                    .then(res => {         
                        res.json()
                        this.props.history.push('/guests')
                    })               
            }          
            return false
        })
       })
       e.preventDefault()
    }

    pula(data) {
        console.log(data)
        // => banana 
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
                                <h1>{this.state.message}</h1>
                            </div>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Row>
                                            <Col xs={9} md={10}>
                                            <div className="addtable">                          
                                                <Link to={`/guests/addtable`} style={{fontSize: 40}}><i className="fas fa-plus"></i></Link>
                                            </div>                                                         
                                                    {this.state.tables.map((table, i)=>(                                                              
                                                               <div className="table" key = {i} onDrop={(e)=> this.onDrop(e, table._id)} onDragOver={(e)=>this.onDragOver(e)}>                                                              
                                                                    <Circle key={table._id} numberTable={table.number} numberPeople = {table.number_of_people} asezati={table.people}/>
                                                                    {Array.from(Array(parseInt(table.number_of_people))).map((item, index) =>
                                                                            (<Patrat key={index} draggable onDrag={(e)=>this.onDrag(e, item)} asezati={table.people} />)
                                                                    )}
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
                                                                   
                                                                   <div className="guest" key={guests._id}><ListGroupItem onDrop={(e)=> this.onDrop2(e, guests)} onDragOver={(e)=>this.onDragOver(e)} onDrag={(e)=>this.onDrag(e, guests)} draggable key={guests._id}><h4>{guests.name} &nbsp;&nbsp; {guests.status}</h4></ListGroupItem></div>
                                                                ))}
                                                            </ListGroup>                                                                                                                
                                                        </div>         
                                            </Col>
                                        </Row>                              
                                    </Col>
                                </Row>
                            </div>
                            <ToastContainer removeCloseButton="true" position="bottom-center" store={toast}/>
                            <div>
                                <ul>
                                    <Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
                                    <Draggable type="fruit" data="apple"><li>Apple</li></Draggable>
                                    <Draggable type="metal" data="silver"><li>Silver</li></Draggable>
                                </ul>
                                <Droppable
                                    types={['fruit']} // <= allowed drop types
                                    className="spatiu"
                                    onDrop={this.pula.bind(this)}>
                                    <ul className="Smoothie"></ul>
                                </Droppable>
                            </div>
                </div>
        )
    }
}
export default GuestsPage

