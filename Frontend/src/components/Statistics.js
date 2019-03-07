import React from 'react'
import { Pie, Bar, HorizontalBar } from 'react-chartjs-2'
import Navigation from './Navigation'

import '../style/Statistics.css'

class Statistics extends React.Component{

    render(){

        return(

            <div>
                 <Navigation/>
                <div className="container">
                    <div className="title">
                        <h1>Statistics</h1>
                    </div>
                    <div className="statistics1">
                    <Pie
                        data={
                            {labels: ['>0<20', '>20<40','>40<60', '>60'],
                            datasets:[{
                                data:[
                                    5,
                                    7,
                                    9,
                                    3
                                    
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
                        width={100}
                        height={100}
                    /> 
                    </div>
                    <div className="statistics2">
                        <HorizontalBar
                            data={
                                {labels: ['>0<20', '>20<40','>40<60', '>60'],
                                datasets:[{
                                    label: 'My First dataset',
                                    data:[
                                        5,
                                        10,
                                        20,
                                        40
                                        
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
                            width={100}
                            height={40}
                        /> 
                    </div>

                    <div className="statistics3">
                        <Bar
                            data={
                                {labels: ['>0<20', '>20<40','>40<60', '>60'],
                                datasets:[{
                                    label: 'My First dataset',
                                    data:[
                                        5,
                                        10,
                                        20,
                                        40
                                        
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
                            width={100}
                            height={40}
                        /> 
                    </div>
            
                </div>
            </div>
        )
    }
}

export default Statistics