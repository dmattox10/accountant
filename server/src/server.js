import path from 'path'
import express from 'express'
import serveIndex from 'serve-index'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { monitor } from 'colyseus'

// import handlers

import { StateHandler } from './actions/statehandler'
import { CreateJoin } from './actions/createjoin'

const port = process.env.port || 2567
const app = express()

const gameServer = new Server({
    server: createServer(app)
})

gameServer.register('state_handler', StateHandler)
gameServer.register('create_join', CreateJoin)

app.use('/', express.static(path.join(__dirname, "static")))
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

gameServer.onShutdown(function(){
  console.log(`game server is going down.`)
});

gameServer.listen(port)

console.log(`Listening on http://localhost:${ port }`)