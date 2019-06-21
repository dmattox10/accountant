import { Room } from "colyseus"

export class CreateOrJoinRoom extends Room {
    maxClients = 4

    onInit (options) {
        console.log("CREATING NEW ROOM")
    }

    onJoin (client, options, auth) {
        console.log("JOINING ROOM");
    }

    requestJoin (options, isNewRoom) {
        return (options.create)
            ? (options.create && isNewRoom)
            : this.clients.length > 0
    }

    onMessage (client, message) {

    }

    onLeave (client) {
        console.log("ChatRoom:", client.sessionId, "left!")
    }

}