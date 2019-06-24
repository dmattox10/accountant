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
    //if (games.some(e => e.name === payload.room)) {
      

  //if (games.filter(function(e) { return e.name === payload.room }).length > 0) {
    
    //let objIndex = games.findIndex((game => game.name === payload.room)) // returning -1 always....
    console.log(payload)
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
        //return socket.emit('success', 'joined room ' + room)
        return io.to(payload.room).emit('update', response)
        //return socket.emit('update', response)
      }
    })
  })

  socket.on('list', (payload) => {
    if (games.some(e => e.name === payload.room)) {
      objIndex = games.findIndex((game => game.name === payload.room))
      let players = games[objIndex].players
      let payload = {
        type: list,
        players: players
      }
      //return socket.emit('list', players)
      return io.to(payload.room).emit('update', payload)
    }
    else {
      // handle error gracefully here
      // return socket.emit('failure', 'Game does not exist!')
    }
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
  console.log("server is running on port " + port)
})