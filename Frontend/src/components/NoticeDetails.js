import React, {Component} from 'react'
import {Link} from 'react-router-dom'

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
        let url = `http://localhost:4000/notice/${id}`
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
        let url = `http://localhost:4000/notice/delete/${id}`
        fetch(url,{
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),

        })
        .then(res => res.json())
        .then(()=>{

            this.props.history.push("/notice")
        })
        .catch(err => console.log(err))

        //this.props.history.push('/notice')
    }


    componentDidMount(){

        this.fetchNotice()
    }


    render(){

        return(
        
        <div>
            <h1 className="center">{this.state.details.title}</h1>
            <ul className="collection">
                <li className="collection-item">Title: {this.state.details.title}</li>
                <li className="collection-item">Description: {this.state.details.description}</li>
            </ul>
            <Link className="btn" to={`/notice/edit/${this.state.details._id}`}>Edit</Link>
            <button onClick={this.deleteNotce} className="btn red right">Delete</button>
        </div>
        )
    }
}

export default NoticeDetails
