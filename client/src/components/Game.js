import React, { Component } from 'react'
import socketIOClient from "socket.io-client"

const socket = socketIOClient('10.0.0.158:4001') // Can I do this?

class Game extends Component {

    constructor() {
        super()

    
        this.state = {
            endpoint: '10.0.0.158:4001',
            name: 'John',
            room: 'E64G7J'
        }
    }
    componentWillMount() {
        //socket.emit('join', room)
        this.send('join', this.state.room)
    }

    componentWillUnmount() {
        //socket.emit('leave', name)
        this.send('leave', this.state.name)
    }

    send = (command, payload) => {
        //const socket = socketIOClient(this.state.endpoint)
        socket.emit(command, payload)
    }

    render() {
       

        

        
        return (
            <div>
                <h1></h1>
            </div>
        )
    }
}

export default Game