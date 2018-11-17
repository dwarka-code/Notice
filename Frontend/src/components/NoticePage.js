import React from 'react';
import NoticeItem from './NoticeItem'

class NoticePage extends React.Component{

    constructor(props){

        super(props);
        this.state={

            notices: []
        }

    }
    

    fetchNotice(){

        
        var url = "http://localhost:4000/notice"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{
            if(res.logIn === ''){

                this.props.history.push('/login')
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

