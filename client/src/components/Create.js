import React, { Component } from 'react'
import { withRouter } from "react-router";
import socketIOClient from "socket.io-client"

const socket = socketIOClient('http://localhost:4001')

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
            bank: 2500,
            money: 1000,
            infinite: true,
            negative: false,
            error: ''
        }

        socket.on('success', (message) => {
            this.joinGame()
        })

        socket.on('failure', (message) => {
            this.errorMessage(message)
        })

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    errorMessage = (message) => {
        this.setState({
            error: message
        })
    }

    joinGame = () => {
        let options = {
            room: this.state.room,
            name: this.state.name.replace(' ', ''),
            bank: parseInt(this.state.bank),
            money: parseInt(this.state.money),
            infinite: this.state.infinite,
            negative: this.state.negative
        }
        this.props.history.push("/game", {...options})
    }

    send = (command, payload) => {
        socket.emit(command, payload) // change 'red' to this.state.color
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
            name: this.state.name.replace(' ', ''),
            bank: parseInt(this.state.bank),
            money: parseInt(this.state.money),
            infinite: this.state.infinite,
            negative: this.state.negative
        }
        this.send('create', options)
        //this.props.history.push("/game", {...options});
    }

    makeid(length) {
        var result           = ''
        var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'
        var charactersLength = characters.length
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
     }

    componentWillMount() {
        // Set the room name here, to display on screen
        let id = this.makeid(6)
        this.setState({
            room: id
        })
    }

    componentWillUnmount() {
        //this.send('leave', this.state.room)
    }

    render() {
        const { room, error } = this.state
        return (
            <div className="container-fluid">
                <span className="align-middle">
                    <div className="bg bg-secondary">
                        <div className="container">
                            <div className="card text-white bg-info mb-3">
                                <div className="card-title">Create Game</div>
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
                                        <label>Starting Player Amount</label>
                                        <input className="form-control"
                                            placeholder="2500"
                                            name="money"
                                            id="money"
                                            onChange={ this.handleInputChange }
                                            value={ this.state.money }
                                        /><br />
                                        <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            name='infinite'
                                            id='checkbox-infinite'
                                            type='checkbox'
                                            checked={ this.state.infinite }
                                            onChange={() => this.setState({ infinite: !this.state.infinite })}
                                        />

                                        <span className='padding'>
                                            <label className='form-check-label' htmlFor='checkbox-infinite'>
                                                Infinite Bank?
                                            </label>
                                        </span>
                                        </div>
                                        <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            name='negative'
                                            id='negative'
                                            type='checkbox'
                                            checked={this.state.negative}
                                            onChange={() => this.setState({ negative: !this.state.negative })}
                                        />

                                        <span className='padding'>
                                            <label className='form-check-label' htmlFor='checkbox-negative'>
                                            Negative Player Money?
                                            </label>
                                        </span>
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-primary">Enter Game</button>
                                        <div className="error"><h3>{ error }</h3></div>
                                        
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