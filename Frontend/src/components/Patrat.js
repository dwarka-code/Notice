import React from 'react'

import '../style/Square.css'

class Patrat extends React.Component{

    render(){
        const css = this.props.css;

        return(

            <div
            className="square"
            style={{
              transform:
                "rotate(" +
                css.rotate +
                "deg) translate(" +
                css.radius +
                "px) rotate(" +
                css.rotateReverse +
                "deg)"
            }}
          >
            {this.props.num}
          </div>
        )
    }
}

export default Patrat