import { Server } from "socket.io";
import { Game } from "./classes/Game";

const rooms = new Map<string, Game>() // actual game instance, string - roomId. Game -  object 

export function setupListeners(io: Server) {
  io.on("connection", (socket) => {
    console.log(`new connection - ${socket.id}`);

    socket.on('join-game', (roomId: string, name: string) => {
      //whenever someone tries to join a game, we need the room id and name
      if (!roomId) {
        return socket.emit("error", "invalid room id");
        //'return is used, if wrong room id or name is provided, the execution of the program wont continue and willl terminate at this point'
      }

      if (!name) {
        return socket.emit("error", "please provide name");
      }

      socket.join(roomId);

      if (rooms.has(roomId)) {
        const game = rooms.get(roomId);

        if (!game) return socket.emit("error", "game not found");
      }
      else {

      }
    })
  })
}