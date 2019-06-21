import React, { Component } from 'react'

import Colyseus from 'colyseus.js'

class Create extends Component {

    constructor() {
        super()
    
        // use current hostname/port as colyseus server endpoint
        var endpoint = location.protocol.replace("http", "ws") + "//" + location.hostname
    
        // development server
        if (location.port && location.port !== "80") { endpoint += ":2657" }
    
        this.colyseus = new Colyseus(endpoint)
        //this.chatRoom = this.colyseus.join('chat', { channel: window.location.hash || "#default" })
        //this.chatRoom.on('update', this.onUpdateRemote.bind(this))
    
        this.state = {
            options: {
                room: '',
                name: '',
                bank: '0',
                infinite: true,
                requests: false,
                logs: false,
            }

        }
    }

    componentWillMount() {
        // Set the room name here, to display on screen
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Create