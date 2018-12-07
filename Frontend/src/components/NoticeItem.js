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
            <div>
                <h5>
                    <i class="material-icons">filter_drama</i>
                    <Link to={`/notice/${this.state.item._id}`}>{this.state.item.title}</Link>
                </h5>
            </div>
            </li>
        )
    }
}
 
export default NoticeItem
