import React from 'react'
import Patrat from './Patrat'
import '../style/Circle.css'

class Circle extends React.Component{

    constructor(){

        super();
        this.state={

            squares: []
        }
    }

    buildCircle = () => {
        let num = this.props.numberPeople; //Number of Square to be generate
        const type = 1;
        let radius = "120"; //distance from center
        let start = -90; //shift start from 0
        let slice = (360 * type) / num;
    
        let items = [];
        let i;
        for (i = 0; i < num; i++) {
          let rotate = slice * i + start;
          let rotateReverse = rotate * -1;
    
          items.push({
            radius: radius,
            rotate: rotate,
            rotateReverse: rotateReverse
          });
        }
        this.setState({ squares: items });
      };

      componentWillMount(){

        this.buildCircle()
      }

    render(){
        return(
            <div>
            <div className="circle">
              <div className="circle-hold">
                {this.state.squares.map(function(value, index) {
                  return <Patrat key={index} css={value} num={index + 1} />;
                })}
              </div>
            </div>
          </div>
        )
    }
}
export default Circle