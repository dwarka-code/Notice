import React from 'react'

import '../style/Circle.css'

class Circle extends React.Component{

    render(){

        return(
            <div className="numberCircle">
                <div>{this.props.numberTable}</div>                  
            </div>
        )
    }
}
export default Circle