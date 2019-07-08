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
      infinite: payload.infinite,
      negative: payload.negative,
      players: []
    })
    return socket.emit('success', 'created room ' + payload.room)
  })

  socket.on('rejoin', async (payload) => {
    await Game.findOne({name: payload.room})
    .then(game => {
      if (game) {
        let exists = false
        game.players.forEach((player, i) => {
          if (payload.name === player.name) {
            exists = true
          }
        })
        if (exists) {
          socket.join(payload.room)
            return io
              .to(payload.room)
              .emit('update', game)
        }
        else {
          socket.emit('failure', 'Check the name you entered.')
        }
      }
      else {
        socket.emit('failure', 'Room does not exist.')
      }
    })
  })

  socket.on('join', async (payload) => {
    await Game.findOne({name: payload.room})
    .then(game => {
      if (game) {
        let testPlayers = game.players
        const player = {
          name: payload.name,
          money: game.money
        }
        testPlayers.push(player)
        let nameTaken = false
        testPlayers.map(existingPlayer => existingPlayer.name).sort().sort((a, b) => {
            if (a === b) nameTaken = true
          })
        if (nameTaken) {
          return socket.emit('failure', 'Player name taken.')
        }
        else {
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
      }
      else {
        socket.emit('failure', 'Room does not exist.')
      }
    })
  })

  socket.on('update', async (payload) => {
    await Game.findOne({name: payload.room})
      .then( async (game) => {
        if (payload.to === 'bank') {
          if (game.negative) {
            game.bank += payload.amount
            game.players.forEach((player, i) => {
              if (player.name === payload.from) {
                game.players[i].money -= payload.amount
                Game.findOneAndUpdate(
                  {name: payload.room},
                  game,
                  {new: true}
                ).then(newGame => {
                  return io
                  .to(payload.room)
                  .emit('update', newGame)
                })
              }
            })
          }
          else {
            game.players.forEach((player, i) => {
              if (player.name === payload.from) {
                if (game.players[i].money - payload.amount >= 0) {
                  game.players[i].money -= payload.amount
                  game.bank += payload.amount
                  Game.findOneAndUpdate(
                    {name: payload.room},
                    game,
                    {new: true}
                  ).then(newGame => {
                    return io
                    .to(payload.room)
                    .emit('update', newGame)
                  })
                }
                else {
                  return io
                  .to(payload.room)
                  .emit('error', 'Insufficient Player Funds, ' + payload.from)
                  //game.players[i].money = 0
                }
              }
            })
          }
        }
        else if (payload.to === payload.from) {
          if (game.infinite) {
            game.bank -= payload.amount
            game.players.forEach((player, i) => {
              if (player.name === payload.to) {
                game.players[i].money += payload.amount
                Game.findOneAndUpdate(
                  {name: payload.room},
                  game,
                  {new: true}
                ).then(newGame => {
                  return io
                  .to(payload.room)
                  .emit('update', newGame)
                })
              }
            })
          }
          else {
            if (game.bank - payload.amount >= 0) {
              game.bank -= payload.amount
              game.players.forEach((player, i) => {
                if (player.name === payload.to) {
                  game.players[i].money += payload.amount
                  Game.findOneAndUpdate(
                    {name: payload.room},
                    game,
                    {new: true}
                  ).then(newGame => {
                    return io
                    .to(payload.room)
                    .emit('update', newGame)
                  })
                }
              })
            }
            else {
              return io
              .to(payload.room)
              .emit('error', 'Insufficient Bank Funds, ' + payload.to)
            }
          }
        }
        else {
          if (game.negative) {
            game.players.forEach((player, i) => {
              if (player.name === payload.to) {
                game.players[i].money += payload.amount
              }
              if (player.name === payload.from) {
                game.players[i].money -= payload.amount
              }
            })
            Game.findOneAndUpdate(
              {name: payload.room},
              game,
              {new: true}
            ).then(newGame => {
              return io
              .to(payload.room)
              .emit('update', newGame)
            })
          }
          else {
            game.players.forEach((player, i) => {
              if (player.name === payload.from && player.money - payload.amount >= 0) {
                game.players[i].money -= payload.amount
                game.players.forEach((player, j) => {
                  if (player.name === payload.to) {
                    game.players[j].money += payload.amount
                    Game.findOneAndUpdate(
                      {name: payload.room},
                      game,
                      {new: true}
                    ).then(newGame => {
                      return io
                      .to(payload.room)
                      .emit('update', newGame)
                    })
                  }
                })
              }
              else if (player.name === payload.from && player.money - payload.amount < 0) {
                return io
                  .to(payload.room)
                  .emit('error', 'Insufficient Player Funds, ' + payload.from)
              }
              /*
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
              */
            })
          }
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
