import React from 'react'
import '../style/Circle.css'

class Circle extends React.Component{


    render(){
        return(
            <div>
                <div className="numberCircle">{this.props.numberTable}</div> 
            </div>
        )
    }
}
export default Circle