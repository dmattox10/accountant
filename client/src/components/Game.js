import React, { Component } from 'react'
import socketIOClient from "socket.io-client"

import Player from './Player'

const socket = socketIOClient('10.0.0.158:4001')

class Game extends Component {
    
    

    constructor() {
        super()

    
        this.state = {
            endpoint: '10.0.0.158:4001',
            name: '',
            room: '',
            players: [],
            bank: 0,
            error: '',
            amount: 0
        }
        socket.on('update', (payload) => {
            console.log(payload)
            this.handlePayload(payload)
        })
        /*
        socket.on('failure', (payload) => {
            this.handleFailure(payload)
        })
        */
    }


    componentWillMount() {
        console.log(this.props.location.state.name)
        console.log(this.props.location.state.room)
        this.setState({
            name: this.props.location.state.name,
            room: this.props.location.state.room,
            bank: this.props.location.state.bank
        })
        //socket.emit('join', room)
        let payload = {
            name: this.props.location.state.name,
            room: this.props.location.state.room,
        }
        this.send('join', payload)
    }

    componentWillUnmount() {
        //socket.emit('leave', name)
        //this.send('leave', this.state.name)
    }

    send = (command, payload) => {
        //const socket = socketIOClient(this.state.endpoint)
        socket.emit(command, payload)
    }

    handlePayload = (payload) => {
        switch (payload.type) {
            case 'list': 
            this.updatePlayers(payload)
            break;
        }
    }

    updatePlayers = (payload) => {
        this.setState({
            players: payload.players
        })
    }
    
    handleFailure = (payload) => {
        this.setState({
            error: payload
        })
    }
    
    render() {
        const { room } = this.props.location.state
        const { bank, players, error } = this.state


        
        return (
            <div>
                <h1>{ room }</h1>
                <div className="container-fluid">
                    <span class="align-middle">
                        <div className="bg bg-secondary">
                            <div className="container"></div>
                            
                            <div className="card text-white bg-info mb-1">
                                <div className="card-body">
                                    <h3 className="card-title">Send</h3>
                                    <form className="form-inline" onSubmit={ this.handleSubmit }>
                                        <label>Amount:</label>
                                        <input className="form-control"
                                                placeholder="Amount"
                                                name="amount"
                                                id="amount"
                                                onChange={ this.handleInputChange }
                                                value={ this.state.amount }
                                            /><br />
                                    </form>
                                </div>
                            </div>
                            {players.map((player, i) =>
                            <div><Player player={ player.name } amount={ player.money }>
                                
                            </Player></div>)}

                            <div><Player player="Bank" amount={ bank }/></div>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default Game