import React from "react";
import Navigation from './Navigation'

class EditNotice extends React.Component{

    constructor(props){

        super(props)
        this.state={

            id: '',
            title: '',
            description: '',
            date: ''

        }

        this.editNotice = this.editNotice.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    fetchNotice(){

        let id = this.props.match.params.id
        console.log(id)
        let url = `/notice/${id}`
        fetch(url)
        .then(res => res.json())
        .then(res => {

            this.setState({

                id: res.data._id,
                title: res.data.title,
                description: res.data.description,
                date: res.data.date
            })
        })
        .catch(err => console.log(err))
    }

    editNotice(newNotice){

        let id = this.props.match.params.id
        let url = `/notice/edit/${id}`
        fetch(url,{

            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(()=>{

            this.props.history.push("/notice")
        })
        .catch(err => console.log(err))

    }

    handleInput(e){

        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({

            [name]: value
        })
    }

    onSubmit(e){

        const newNotice={

            title: this.refs.title.value,
            description: this.refs.description.value
        }

        this.editNotice(newNotice)
        e.preventDefault()
    }


    componentDidMount(){

        this.fetchNotice()
    }

    render(){

        return (
            <div>

               <Navigation />
               <h1 className="center">Edit Notice</h1>
               
               <form onSubmit={this.onSubmit}>

                    <div>
                        <h4>
                            <label for="Title">Title</label>
                            <input type="text" name="title" ref="title" value={this.state.title} onChange={this.handleInput}/>
                        </h4>     
                    </div>
                    <div>
                        <h4>
                        <label for="Description">Description</label>
                    <input type="text" name="description" ref="description" value={this.state.description} onChange={this.handleInput}/>
                        </h4>
                    </div>
                    <div>
                        <h4>
                        <label for="Date">Date</label>
                    <input type="text" name="date" ref="date" value={this.state.date} onChange={this.handleInput} />
                        </h4>
                    </div>
                    
                    
                    <button className="btn yellow" type="submit">Edit</button>
                    
               </form>
            </div>
        )
    }
}

export default EditNotice