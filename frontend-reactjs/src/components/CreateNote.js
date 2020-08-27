import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {
    state = {
        notes: [],
        users: [],
        userSelected: '',
        date: new Date(),
        title: '',
        content:'',
        editing: false,
        _id : ''
    }
    /*metodo que se ejecuta antes de render*/
    async componentDidMount() {
        this.getUsers()
        if(this.props.match.params.id){
            this.getUser(this.props.match.params.id)
        }
    }

    getUser = async (id) =>{
        const res = await axios.get('http://localhost:5000/api/v1/notes/'+id)
        this.setState({
            userSelected: res.data.author,
            title       : res.data.title,
            content     : res.data.content,
            date        : new Date(res.data.date),
            editing     : true,
            _id         : id          
        })
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/v1/users')
        this.setState({ 
            users: res.data.map(user => user.username),
            userSelected : res.data[0].username 
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }

        if(this.state.editing){
            await axios.put('http://localhost:5000/api/v1/notes/'+this.state._id, newNote)
        }else{
            await axios.post('http://localhost:5000/api/v1/notes', newNote)
        }
        
        this.setState({ 
            title  : '', 
            content: '',
            date : new Date(),
            userSelected: '',
            editing : false,
            _id: ''
        });

        window.location.href = "/";
    }

    onChangeInput = (e) => {
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    /*onChangeUser = (e) => {
        console.log(e.target.value)
        this.setState({ userSelected: e.target.value })

    }*/

    onChangeDate = date => {
        this.setState({ date })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Note</h4>
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            value={this.state.userSelected}
                            onChange={this.onChangeInput}
                            >
                            {
                                this.state.users.map(user =>
                                    <option key={user}>
                                        {user}
                                    </option>

                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text"
                            placeholder="Title"
                            name="title"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <textarea 
                            name="content"
                            placeholder="Content"
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeInput}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker 
                            className="form-control"
                            selected = {this.state.date}
                            onChange = {this.onChangeDate}
                            />
                    </div>                 

                    <form onSubmit={this.onSubmit}>

                        <button className="btn btn-primary btn-block" type="submit">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}
