import React from 'react'
import { Pie, Doughnut } from 'react-chartjs-2'
import { Button } from 'react-bootstrap'
import Navigation from './Navigation'

import '../style/Statistics.css'

class Statistics extends React.Component{

    constructor(){

        super()
        this.state={

            age020: 0,
            age2040: 0,
            age4060: 0,
            age60: 0,
            vine: 0,
            nuvine: 0,
            nustie: 0
        }
    }
    logOut = () =>{

        let url = "/"
        fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(),
            headers: new Headers({'Content-Type': 'application/json'})
        },{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{

            this.props.history.push('/')
        })
    }

    fetchGuests(){
        let url = "/guests"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{
            if(res.logIn === ''){
                this.props.history.push('/')    
            }else{

                this.setState({
                    age020: res.age020,
                    age2040: res.age2040,
                    age4060: res.age4060,
                    age60: res.agebigger60,
                    vine: res.vine,
                    nuvine: res.nuvine,
                    nustie: res.nustie
                })
            }
        })
    }

    componentDidMount(){

        this.fetchGuests()
    }
    render(){          
        return(
            <div>
                 <Navigation/>
                 <div className="logout_button">
                        <Button bsSize="large" bsStyle="danger" onClick={this.logOut}>Log out</Button>
                </div>
                <div className="container">
                    <div className="title">
                        <h1>Statistics</h1>
                    </div>
                    <div className="statistics1">
                    <Pie
                        data={
                            {
                                labels: ['0-20', '20-40','40-60', '60+'],
                                datasets:[{
                                    data:[
                                        this.state.age020,
                                        this.state.age2040,
                                        this.state.age4060,
                                        this.state.age60
                                        
                                    ],
                                    backgroundColor:[
                                        'rgba(0, 25, 0, 0.3)',
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
                        <Doughnut
                             data={
                                {
                                    labels: ['Yes', 'No','Maybe'],
                                    datasets:[{
                                        data:[
                                            this.state.vine,
                                            this.state.nuvine,
                                            this.state.nustie,
                                        ],
                                        backgroundColor:[
                                            'rgba(0, 150, 0, 0.5)',
                                            'rgba(150, 0, 0, 0.5)',
                                            'rgba(0, 25, 0, 0.3)',
                                        ]
                                    }]
                                }
                            }
                            width={60}
                            height={60}
                        />
                   </div>
                </div>
            </div>
        )
    }
}

export default Statistics