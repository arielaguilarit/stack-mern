import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    //EStado de la aplicacion
    state = {
        users:[],
        username:''
    }

    /*metodo que se ejecuta antes de render*/
    componentDidMount(){
        this.getUsers()
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/v1/users')
        this.setState({ users:res.data })
    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:5000/api/v1/users/' + id)
        this.getUsers()
    }


    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault()
        await axios.post('http://localhost:5000/api/v1/users/', { 
            username: this.state.username 
        })
        this.setState({ username:'' });
        this.getUsers()
    }

    
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create User</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" 
                                           className="form-control"
                                           value={ this.state.username }
                                           onChange={this.onChangeUserName}/>
                                </div>
                                <button className="btn btn-primary btn-block" type="submit">Save</button>
                            </form>
                    </div>   
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map( user =>(
                                <li 
                                    className="list-group-item list-group-item-action" 
                                    key={ user._id }
                                    onDoubleClick = { () => this.deleteUser(user._id) }>
                                    { user.username }
                                </li> )
                            )
                        }
                    </ul>
                </div>
                
            </div>
        )
    }
}
