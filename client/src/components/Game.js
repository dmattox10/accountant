import React, { Component } from 'react'

class Game extends Component {

    constructor() {
        super()

    
        this.state = {

        }
    }
    componentWillMount() {
        console.log(this.props.location)
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