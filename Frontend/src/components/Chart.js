import React from 'react'
import {Pie} from 'react-chartjs-2'

class Chart extends React.Component{

    render(){

        return(

        <div>
          <Pie
                data={
                    {labels: ['>0<20', '>20<40','>40<60', '>60'],
                    datasets:[{
                        label: 'Population',
                        data:[
                            this.props.age020,
                            this.props.age2040,
                            this.props.age4060,
                            this.props.agebigger60
                            
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(24, 19, 45, 0.6)',
                            'rgba(78, 45, 235, 0.6)',
                            'rgba(14, 145, 135, 0.6)'
                        ]
                    }]
                }
                }
                width={180}
                height={40}
          />
        </div>
        )
    }
}

export default Chart