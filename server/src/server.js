import express from 'express'
const app = express()
const port = 4001
const http = require('http').createServer()
const io = require('socket.io')(http)

let games = []

io.on('connection', (socket) => {

  socket.on('create', (options) => {
    let game = {
      name: options.room,
      players: [],
      size: 0,
      money: options.money,
      bank: options.bank
    }
    games.push(game)
    return socket.emit('success', 'created room ' + options.room)
  })

  socket.on('join', (payload) => {
    games.forEach((element, index) => {
      if (element.name === payload.room) {
        let player = {}
        player = {
          name: payload.name,
          money: games[index].money
        }
        games[index].size++
        games[index].players.push(player)
        let players = games[index].players
        let response = {
          type: 'list',
          players: players
        }
        console.log(games[index].players)
        socket.join(payload.room)
        // return socket.emit('success', 'joined room ' + room)
        return io.to(payload.room).emit('update', response)
        // return socket.emit('update', response)
      }
    })
  })

  socket.on('update', (payload) => {
    console.log(payload)
  })

  socket.on('leave', (room) => {
    games.forEach((element, index) => {
      if (element.name === room) {
        games[index].size--
        if (games[index].size === 0) {
          games.splice(index, 1)
        }
      }
    })
    socket.disconnect(true)
  })
  /*
  socket.on('online', () => {
    return socket.emit('online', '431')
  })
  */
})

http.listen(port, () => {
  console.log('server is running on port ' + port)
})
