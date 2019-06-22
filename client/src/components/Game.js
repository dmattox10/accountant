import React, { Component } from 'react'

import Colyseus from 'colyseus.js'

class Game extends Component {

    componentWillMount() {
        console.log(this.props.location)
    }
    render() {
        const { room, name, bank, infinite } = this.props.location.state
        return (
            <div>
                <h1>{ room }</h1>
                <h1>{ name }</h1>
                <h1>{ bank }</h1>
                <h1>{ infinite }</h1>
            </div>
        )
    }
}

export default Game