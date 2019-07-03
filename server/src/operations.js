const mongoose = require('mongoose')
const Game = require('./models/Game')

exports.create = async (payload) => {
  let name = payload.name
  let size = 0
  let money = parseInt(payload.money)
  let bank = parseInt(payload.bank)
  await Game.create({
    name: name,
    size: size,
    money: money,
    bank: bank
  })
}

exports.join = async (payload) => {
  let room = payload.room
  let player = {
    name: payload.name,
    money: parseInt()
  }
}

exports.leave = async (payload) => {

}

exports.clean = async () => {

}