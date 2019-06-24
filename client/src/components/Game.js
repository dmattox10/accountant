import React, { Component } from 'react'
import socketIOClient from "socket.io-client"

// import Player from './Player'

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
            //error: ''
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
    /*
    handleFailure = (payload) => {
        this.setState({
            error: payload
        })
    }
    */
    render() {
        const { room, name } = this.props.location.state
        const { bank, players } = this.state
        

        
        return (
            <div>
                <h1>{ room }</h1>
                {players.map((player, i) =>
                            <h3>{ player.name }</h3>)}
            </div>
        )
    }
}

export default Game