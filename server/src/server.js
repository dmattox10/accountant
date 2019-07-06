// import express from 'express'
// import { format } from 'url';
// const app = express()
const port = 4001
const http = require('http').createServer()
const io = require('socket.io')(http)
const mongoose = require('mongoose')

const Game = require('./models/Game')

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
)

// io.origins('*:*')
io.on('connection', (socket) => {
  socket.on('create', async (payload) => {
    await Game.create({
      _id: new mongoose.Types.ObjectId(),
      name: payload.room,
      money: payload.money,
      bank: payload.bank,
      players: []
    })
    return socket.emit('success', 'created room ' + payload.room)
  })
  socket.on('join', async (payload) => {
    await Game.findOne({name: payload.room})
    .then(game => {
      if (game) {
        const player = {
          name: payload.name,
          money: game.money
        }
        Game.findOneAndUpdate(
          {name: payload.room}, 
          {$push: {players: player}},
          {new: true}
        ).then(newGame => {
          socket.join(payload.room)
          return io
            .to(payload.room)
            .emit('update', newGame)
        })
      }
    })
  })
  socket.on('update', async (payload) => {
    await Game.findOne({name: payload.room})
      .then( async (game) => {
        if (payload.to === 'bank') {
          game.bank += payload.amount
          game.players.forEach((player, i) => {
            if (player.name === payload.from) {
              game.players[i].money -= payload.amount
            }
          })
        }
        else if (payload.to === payload.from) {
          game.bank -= payload.amount
          game.players.forEach((player, i) => {
            if (player.name === payload.to) {
              game.players[i].money += payload.amount
            }
          })
        }
        else {
          game.players.forEach((player, i) => {
            if (player.name === payload.to) {
              game.players[i].money += payload.amount
            }
            if (player.name === payload.from) {
              game.players[i].money -= payload.amount
            }
          })
        }
        try {
          await Game.findOneAndUpdate(
            {name: payload.room},
            game,
            {new: true}
          ).then(newGame => {
            return io
            .to(payload.room)
            .emit('update', newGame)
          })
        }
        catch (err) {
          return io
          .to(payload.room)
          .emit('error', 'could not update server')
        }
      })
  })
  socket.on('leave', (room) => {
    socket.disconnect(true)
  })
})

http.listen(port, () => {
  console.log('server is running on port ' + port)
})
