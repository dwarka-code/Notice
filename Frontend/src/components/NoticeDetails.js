import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'

class NoticeDetails extends Component{

    constructor(props){

        super(props)
        this.state={

            details: ''
        }

        this.deleteNotce = this.deleteNotce.bind(this);
    }

    fetchNotice(){

        let id = this.props.match.params.id
        console.log(id)
        let url = `/notice/${id}`
        fetch(url)
        .then(res => res.json())
        .then(res =>{

            this.setState({

                details: res.data,
            },()=>{

                console.log(this.state)
            })
        })
        .catch(err => console.log(err))
    }


    deleteNotce(){

        let id = this.state.details._id
        let url = `/notice/delete/${id}`
        fetch(url,{
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),

        })
        .then(res => res.json())
        .then(()=>{

            this.props.history.push("/notice")
        })
        .catch(err => console.log(err))

    }


    componentDidMount(){

        this.fetchNotice()
    }


    render(){

        return(
        
        <div>
            <Navigation />
            <h1 className="center">{this.state.details.title}</h1>
            <ul>
                <div>
                    <h4>
                        <label for="Title">Title</label>
                        <li>{this.state.details.title}</li>
                    </h4>
                </div>
                <div>
                    <h4>
                        <label for="Description">Description</label>
                        <li size="15">{this.state.details.description}</li>
                    </h4>
                </div>
                
                <div>
                    <h4>
                        <label for="Date">Date</label>
                        <li>{this.state.details.date}</li>
                    </h4>
                </div>
                
            </ul>
            <Link className="btn yellow" to={`/notice/edit/${this.state.details._id}`}>Edit</Link>
            <button onClick={this.deleteNotce} className="btn red right">Delete</button>
        </div>
        )
    }
}

export default NoticeDetails
