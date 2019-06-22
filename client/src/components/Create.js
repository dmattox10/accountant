import React, { Component } from 'react'

import Colyseus from 'colyseus.js'

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
            options: {
                room: '',
                name: '',
                bank: '0',
                infinite: true,
                requests: false,
                logs: false,
            }

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
        
        this.props.history.push("/game", {...this.state.options});
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
        const { options } = this.state
        return (
            <div>
                <h1>{ options.room }</h1>
            </div>
        )
    }
}

export default Create