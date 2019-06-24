import React, { Component } from 'react'

class Player extends Component {
    
    render() {
        const { player, amount } = this.props
        return (
            <div className="card text-white bg-info mb-1">
                <div className="card-body">
                    <h3 className="player"></h3>{ player }<h3 className="right">{ amount }</h3>
                </div>
            </div>
        )
    }
}

export default Player