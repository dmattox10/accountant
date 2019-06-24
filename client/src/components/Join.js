import React, { Component } from 'react'
import { withRouter } from "react-router";

class Join extends Component {

    constructor() {
        super()
    
        this.state = {
            
            room: '',
            name: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let options = {
            room: this.state.room,
            name: this.state.name.replace(' ', ''),
        }
        this.props.history.push("/game", {...options});
    }

    render() {
        return (
            <div className="container-fluid">
                <span className="align-middle">
                    <div className="bg bg-secondary">
                        <div className="container">
                            <div className="card text-white bg-info mb-3">
                                <div className="card-title">Join Game</div>
                                <div className="card-body">
                                    <form className="form-inline" onSubmit={ this.handleSubmit }>
                                        <input className="form-control"
                                            placeholder="Your Name/Alias"
                                            name="name"
                                            id="name"
                                            onChange={ this.handleInputChange }
                                            value={ this.state.name }
                                        /><br />
                                        <input className="form-control"
                                            placeholder="ABC123"
                                            name="room"
                                            id="room"
                                            onChange={ this.handleInputChange }
                                            value={ this.state.room }
                                        /><br />
                                        <br />
                                        <button type="submit" className="btn btn-primary">Enter Game</button>                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        )
    }
}

export default withRouter(Join)