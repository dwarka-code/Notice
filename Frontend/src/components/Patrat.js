import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import '../style/Square.css'

class Patrat extends React.Component{

    render(){

        return(

            <div className="square">
                 <ListGroup >                                                              
                    {this.props.asezati.map((guests)=>(
                                                                            
                        <ListGroupItem key={guests._id}><h4>{guests.name}</h4></ListGroupItem>
                        ))}
                </ListGroup>
            </div>
        )
    }
}

export default Patrat