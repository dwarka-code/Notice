import React from "react";

class AddNotice extends React.Component{

    constructor(props){

        super(props)
        this.state={

            title: '',
            description: ''
        }

        this.addNotice = this.addNotice.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    addNotice(e){

        let url = `http://localhost:4000/notice/addnotice`
        fetch(url,{

            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(()=>{

            this.props.history.push("/notice")
        })
        .catch(err => console.log(err))
        e.preventDefault()
    }


    handleChange(e){

        
        const {name, value} = e.target
        this.setState({

            [name]: value
        })
    }


    render(){

        return (
            <div>

                <h1 className="center">Add Notice</h1>
                <form onSubmit={this.addNotice}>                  
                    <input type="text" name="title" onChange={this.handleChange} placeholder="Title"/>
                    <input type="text" name="description" onChange={this.handleChange} placeholder="Description"/>
                    <input className="btn" type="submit" value="Add" />
                </form>
               
            </div>
        )
    }
}

export default AddNotice