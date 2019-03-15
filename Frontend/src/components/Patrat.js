import React from 'react'

import '../style/Square.css'

class Patrat extends React.Component{

    render(){

        return(

            <div className="square">{this.props.initiala_nume}</div>
        )
    }
}

export default Patrat