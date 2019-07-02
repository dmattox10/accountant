// import express from 'express'
// import { format } from 'url';
// const app = express()
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
      money: parseInt(options.money),
      bank: parseInt(options.bank)
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
          money: parseInt(games[index].money)
        }
        games[index].size++
        games[index].players.push(player)
        let players = games[index].players
        let response = {
          type: 'list',
          players: players
        }
        socket.join(payload.room)
        // return socket.emit('success', 'joined room ' + room)
        io.to(payload.room).emit('update', response)
        response = {}
        response = {
          type: 'bank',
          amount: parseInt(games[index].bank)
        }
        return io.to(payload.room).emit('update', response)
        // return socket.emit('update', response)
      }
    })
  })

  // Need Error and Negative amount handling
  socket.on('update', (payload) => {
    switch (payload.type) {
      case 'transfer':
        let room = payload.room
        let from = payload.from
        let to = payload.to
        let amount = parseInt(payload.amount)
        games.forEach((element, index) => {
          if (element.name === room ) {
            if (from === 'bank') {
              games[index].bank -= amount
              games[index].players.forEach((player, i) => {
                if (player.name === to) {
                  games[index].players[i].money += amount
                  console.log('bank paid ' + player.name + ' ' + amount)
                }
              })
            }
            else if (to === 'bank') {
              games[index].bank += amount
              games[index].players.forEach((player, i) => {
                if (player.name === from) {
                  games[index].players[i].money -= amount
                  console.log(player.name + ' paid the bank ' + amount)
                }
              })
            }
            else {
              games[index].players.forEach((player, i) => {
                if (player.name === to) {
                  games[index].players[i].money += amount
                  console.log(player.name + ' paid')
                }
                if (player.name === from) {
                  games[index].players[i].money -= amount
                  console.log(amount + ' to ' + player.name)
                }
              })
            }
            let players = games[index].players
            let response = {
              type: 'list',
              players: players
            }
            io.to(room).emit('update', response)
            response = {}
            response = {
              type: 'bank',
              amount: parseInt(games[index].bank)
            }
            return io.to(room).emit('update', response)
          }
        })
        break
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
  console.log('server is running on port ' + port)
})
