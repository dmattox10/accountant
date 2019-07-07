import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Join extends Component {
  constructor () {
    super()

    this.state = {
      room: '',
      name: '',
      message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        message: this.props.location.state.message
      })
    }
  }

  handleInputChange (e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    let room = this.state.room.toUpperCase()
    let options = {
      room: room,
      name: this.state.name.replace(' ', '')
    }
    this.props.history.push('/game', { ...options })
  }

  render () {
    const { message } = this.state
    return (
      <div className='container-fluid'>
        <span className='align-middle'>
          <div className='bg bg-secondary'>
            <div className='container'>
              <h3 className='error'>{ message }</h3>
              <div className='card text-white bg-info mb-3'>
                <div className='card-title'>Join Game</div>
                <div className='card-body'>
                  <form className='form-inline' onSubmit={this.handleSubmit}>
                    <input
                      className='form-control'
                      placeholder='Your Name/Alias'
                      name='name'
                      id='name'
                      onChange={this.handleInputChange}
                      value={this.state.name}
                    />
                    <br />
                    <input
                      className='form-control'
                      placeholder='abc123'
                      name='room'
                      id='room'
                      onChange={this.handleInputChange}
                      value={this.state.room}
                    />
                    <br />
                    <br />
                    <button type='submit' className='btn btn-primary'>
                      Enter Game
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    )
  }
}

export default withRouter(Join)
