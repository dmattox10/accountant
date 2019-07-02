import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

//import Player from './Player'

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

        this.sendMoney = this.sendMoney.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        /*
        socket.on('failure', (payload) => {
            this.handleFailure(payload)
        })
        */
    }


    componentWillMount() {
        this.setState({
            name: this.props.location.state.name,
            room: this.props.location.state.room,
            bank: parseInt(this.props.location.state.bank)
        })
        //socket.emit('join', room)
        let payload = {
            name: this.props.location.state.name,
            room: this.props.location.state.room,
        }
        this.send('join', payload)
    }

    send = (command, payload) => {
        //const socket = socketIOClient(this.state.endpoint)
        socket.emit(command, payload)
    }

    handlePayload = (payload) => {
        switch (payload.type) {
            case 'list': 
            this.updatePlayers(payload)
            break
            case 'bank':
            this.updateBank(payload)
            break
        }
    }

    updatePlayers = (payload) => {
        this.setState({
            players: payload.players
        })
    }
    updateBank = (payload) => {
        this.setState({
            bank: parseInt(payload.bank)
        })
    }
    
    handleFailure = (payload) => {
        this.setState({
            error: payload
        })
    }

    sendMoney = (player, amount) => {
        let payload = {
            type: 'transfer',
            room: this.state.room,
            from: this.state.name,
            to: player,
            amount: parseInt(amount)
        }
        this.send('update', payload)
        this.setState({
            amount: 0
        })
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        const { room } = this.props.location.state
        const { bank, players, error } = this.state


        
        return (
            <div>
                <h1>{ room }</h1>
                <div className='container-fluid'>
                    <span class='align-middle'>
                        <div className='bg bg-secondary'>
                            <div className='container'></div>
                            
                            <div className='card text-white bg-info mb-1'>
                                <div className='card-body'>
                                    <h3 className='card-title'>Send</h3>
                                    <form className='form-inline' onSubmit={ this.handleSubmit }>
                                        <label>Amount:</label>
                                        <input className='form-control'
                                            placeholder='Amount'
                                            name='amount'
                                            id='amount'
                                            type='number'
                                            onChange={ this.handleInputChange }
                                            value={ this.state.amount }
                                        /><br />
                                        <br />
                                    </form>
                                </div>
                            </div>
                            { players.map(player => 
                                <div className='card text-white bg-info mb-1'>
                                    <div className='card-body' onClick={ () => this.sendMoney(player.name, this.state.amount) }>
                                    <h3 className='player'/>
                                    {player.name}
                                    <h3 className='right'>{player.money}</h3>
                                    </div>
                                </div>
                            )}
                            <div className='card text-white bg-info mb-1'>
                                <div className='card-body' onClick={ () => this.sendMoney('bank', this.state.amount) } >
                                <h3 className='player'/>
                                Bank
                                <h3 className='right'>{ bank }</h3>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default Game