import React from 'react'
import Patrat from './Patrat'


import '../style/Circle.css'

class Circle extends React.Component{

    render(){
        return(
            <div>
                <div className="numberCircle">{this.props.numberTable}</div>
                {Array.from(Array(parseInt(this.props.numberPeople))).map((item, index) =>
                        (<Patrat key={index} asezati={this.props.asezati} />)
                )}
               
            </div>
        )
    }
}
export default Circle