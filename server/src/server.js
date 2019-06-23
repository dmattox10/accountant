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
      bank: options.bank
    }
    console.log('Room ' + options.room + ' created')
    games.push(game)
    return socket.emit('success', 'created room ' + options.room)
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
  /*
  socket.on('online', () => {
    return socket.emit('online', '431')
  })
  */
})

http.listen(port, () => {
  console.log("server is running on port " + port)
})