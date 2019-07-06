

exports.create = async (payload) => {
  await Game.create({
    _id: new mongoose.Types.ObjectId(),
    name: payload.room,
    money: payload.money,
    bank: payload.bank,
    players: []
  })
}

exports.join = async (payload) => {
  Game.findOne({name: payload.room}).then(game => {
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
        server.send(newGame)
      })
    }
    else {
      console.log('error, no game exists')
    }
  })
}

exports.transfer = async (payload) => {
  const filter = payload.room
  const game = await Game.findOne({room: filter})
  if (payload.to === 'bank') {
    game.bank += payload.amount
    game.players[payload.from] -= payload.amount
  }
  else if (to === from) {
    game.bank -= payload.amount
    game.players[payload.to] += payload.amount
  }
  else {
    game.players[payload.to] += payload.amount
    game.players[payload.from] -= payload.amount
  }
  try {
    return await Game.findOneAndUpdate(
      {room: filter},
      game,
      {new: true}
    )
  }
  catch (e) {
    return 'error'
  }
}
/*
exports.clean = async () => {

}
*/
