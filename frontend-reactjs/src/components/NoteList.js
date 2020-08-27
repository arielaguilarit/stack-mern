import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NoteList extends Component {
    //EStado de la aplicacion
    state = {
        notes:[]
    }

    /*metodo que se ejecuta antes de render*/
    componentDidMount(){
        this.getNotes()
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:5000/api/v1/notes')
        this.setState({ 
            notes: res.data
        })
    }

    deleleNote = async (id) => {
        const res = await axios.delete('http://localhost:5000/api/v1/notes/'+id)
        console.log(res.data)
        this.getNotes()
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map( note => (
                        <div className="col-md-4" key={ note._id }>
                            <div className="card ">
                                <div className="card-header d-flex justify-content-between">
                                    <h3>{ note.title }</h3>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={"/edit/"+note._id}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <strong>{ note.author }</strong>
                                    <p>{ note.content }</p>
                                    <p>{ format(note.date) }</p>
                                </div>
                                <div className="card-footer">
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => {this.deleleNote(note._id)}}>
                                        Delete
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
