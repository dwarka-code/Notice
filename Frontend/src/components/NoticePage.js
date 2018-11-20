import React from 'react';
import NoticeItem from './NoticeItem'

class NoticePage extends React.Component{

    constructor(props){

        super(props);
        this.state={

            notices: []
        }

        this.logOut = this.logOut.bind(this)

    }

    logOut(){

        let url = "http://localhost:4000/"
        fetch(url,{

            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        },{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{

            console.log(res.status)
            this.props.history.push('/')
        })
    }
    

    fetchNotice(){

        
        var url = "http://localhost:4000/notice"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{
            if(res.logIn === ''){

                this.props.history.push('/')
            }else{

                this.setState({
              
                    notices: res.data,
                })
            }
        })
    }

    componentDidMount(){

        this.fetchNotice()

    }

    render(){

        const noticeItems = this.state.notices.map((notice, i) => {

            return(

                <NoticeItem key={notice._id} item={notice}/>
            )
        })

        return(
          
            <div>
                <button onClick={this.logOut} className="btn blue right" type="submit" >Log out</button>
                <h1 className="center">Notice</h1>
                   <ul className="collection">

                        {noticeItems}
                   </ul>
                   <a href="/notice/addnotice"className="btn-floating btn-large red"><i className="fa fa-plus"></i></a>
            </div>
                    
        )
    }
}

export default NoticePage

