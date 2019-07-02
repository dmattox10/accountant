import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class All extends Component {

    render() {
        return (
            <div>
                <Link to="/create">Create</Link>
                <Link to="/join">Join</Link>
                <Link to="/rejoin">Rejoin</Link>
                <Link to="/help">HowTo</Link>
            </div>
        )
    }

}

export default All