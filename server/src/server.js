import express from 'express'
const app = express()
const port = 3000
const http = require('http').createServer()
const io = require('socket.io')(http)

let games = []

io.on('connection', (socket) => {

  socket.on('create', (room) => {
    let game = {
      name: room,
      players: [],
      bank: ''
    }
    console.log('Room ' + room + ' created')
    return socket.emit('success', 'created room ' + room)
  })

  socket.on('join', (room) => {
    if (games.some(e => e.name === room)) {
  //if (games.filter(e => e.name === room).length > 0) {  
  //if (games.filter(function(e) { return e.name === room }).length > 0) {  
      return socket.emit('success', 'joined room ' + room)
    }
    else {
      return socket.emit('failure', 'room ' + room + ' does not exist')
    }
  })
})

http.listen(port, () => {
  console.log("server is running on port " + port)
})