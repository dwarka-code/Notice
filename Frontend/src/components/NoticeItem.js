import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NoticeItem extends Component{

    constructor(props){

        super(props)
        this.state={

            item: props.item
        }
    }

    render(){

        return(

            <li className="collection-item">
            <Link to={`/notice/${this.state.item._id}`}>{this.state.item.title}</Link>
            </li>
        )
    }
}

export default NoticeItem
