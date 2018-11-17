import React from 'react'
import {Pie} from 'react-chartjs-2'

class Chart extends React.Component{

    render(){

        return(

        <div>
            <h1>{this.props.age1}</h1>
            <h1>{this.props.age2}</h1>
          <Pie
                data={
                    {labels: ['>18', '<18'],
                    datasets:[{
                        label: 'Population',
                        data:[
                            this.props.age1,
                            this.props.age2
                            
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)'
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