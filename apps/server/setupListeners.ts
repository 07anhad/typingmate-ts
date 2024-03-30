import { Server } from "socket.io";
import { Game } from "./classes/game";

export const rooms = new Map<string, Game>(); // actual game instance, string - roomId. Game -  object 

export function setupListeners(io: Server) {
  io.on("connection", (socket) => {
    console.log(`new connection - ${socket.id}`);

    socket.on('join-game', (roomId: string, name: string) => {
      // Whenever someone tries to join a game, we need the room id and name
      if (!roomId) {
        return socket.emit("error", "invalid room id");
      }

      if (!name) {
        return socket.emit("error", "please provide name");
      }

      socket.join(roomId);

      if (rooms.has(roomId)) {
        const game = rooms.get(roomId);

        if (!game) return socket.emit("error", "game not found");

        game.joinPlayer(socket.id, name, socket);
      }
      else {
        const game = new Game(roomId, io, socket.id, [], ''); // Create a new game instance
        rooms.set(roomId, game); // Add the new game instance to the rooms map
        game.joinPlayer(socket.id, name, socket); // Join the player to the newly created game
      }
    });
  });
}
