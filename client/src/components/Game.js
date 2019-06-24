import React, { Component } from 'react'
import socketIOClient from "socket.io-client"

import Player from './Player'
import Modal from './Modal'

const socket = socketIOClient('10.0.0.158:4001')

class Game extends Component {

    

    constructor() {
        super()
    
        this.state = {
            endpoint: '10.0.0.158:4001',
            room: '',
            players: [],
            bank: this.props.location.state.bank,
            error: ''
        }
        socket.on('update', (payload) => {
            this.handlePayload(payload)
        })
        socket.on('failure', (payload) => {
            this.handleFailure(payload)
        })
        this.handleClick = this.handleClick.bind(this)
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
            this.updatePlayers(payload.players)
            break;
        }
    }

    updatePlayers = (players) => {
        this.setState({
            players: [...players]
        })
        console.log(this.state.players)
    }
    
    handleFailure = (payload) => {
        this.setState({
            error: payload
        })
    }

    handleClick = (player) => {

    }

    showModal = () => {
        this.setState({ show: true });
      }
      
      hideModal = () => {
        this.setState({ show: false });
      }
    
    render() {
        const { room } = this.props.location.state
        const { bank, players, error } = this.state
        

        
        return (
            <div>
                <h1>{ error }</h1>
                <h1>{ room }</h1>
                <div className="container-fluid">
                    <span class="align-middle">
                        <div className="bg bg-secondary">
                            <div className="container"></div>
                            {players.map((player, i) =>
                            <div><Player onClick={this.handleClick(player.name)} player={ player.name } amount={ player.money }/></div>)}

                            <div><Player onClick={this.handleClick('Bank')} player="Bank" amount={ bank }/></div>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default Game