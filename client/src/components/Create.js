import React, { Component } from 'react'
import { withRouter } from "react-router";
//import Colyseus from 'colyseus.js'

class Create extends Component {

    constructor() {
        super()
    
        // use current hostname/port as colyseus server endpoint
        //var endpoint = location.protocol.replace("http", "ws") + "//" + location.hostname
    
        // development server
        //if (location.port && location.port !== "80") { endpoint += ":2657" }
    
        //this.colyseus = new Colyseus('ws://localhost:2567')
        //this.chatRoom = this.colyseus.join('chat', { channel: window.location.hash || "#default" })
        //this.chatRoom.on('update', this.onUpdateRemote.bind(this))
    
        this.state = {
            
            room: '',
            name: '',
            bank: '2500',
            infinite: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            infinite: !this.state.infinite
        })
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
            name: this.state.name,
            bank: this.state.bank,
            infinite: this.state.infinite,
        }
        this.props.history.push("/game", {...options});
    }

    makeid(length) {
        var result           = ''
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        var charactersLength = characters.length
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
     }

    componentWillMount() {
        // Set the room name here, to display on screen
        let id = this.makeid(6)
        console.log(id)
        this.setState({
            room: id
        })
    }

    render() {
        const { room } = this.state
        return (
            <div className="container-fluid">
                <span className="align-middle">
                    <div className="bg bg-secondary">
                        <div className="container">
                            <div className="card text-white bg-info mb-3">
                                <div className="card-header">Create Game</div>
                                <div className="card-body">
                                    <h5 className="card-title">Game Code: { room }</h5>
                                    <form className="form-inline" onSubmit={ this.handleSubmit }>
                                        <input className="form-control"
                                            placeholder="Your Name/Alias"
                                            name="name"
                                            id="name"
                                            onChange={ this.handleInputChange }
                                            value={ this.state.name }
                                        /><br />
                                        <label>Starting Bank/Pot Amount</label>
                                        <input className="form-control"
                                            placeholder="2500"
                                            name="bank"
                                            id="bank"
                                            onChange={ this.handleInputChange }
                                            value={ this.state.bank }
                                        /><br />
                                        <div className="form-check active">
                                            <input className="form-check-input"
                                            type="checkbox"
                                            checked="checked"
                                            onChange={ this.handleClick }
                                            value=""
                                            name="infinite"
                                            id="infinite"
                                        />
                                        <label className="form-check-label" for="infinite">
                                            Infinite Money in the Bank?
                                        </label><br /><br />
                                        <button type="submit" className="btn btn-primary">Enter Game</button>
                                        </div>
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

export default withRouter(Create)