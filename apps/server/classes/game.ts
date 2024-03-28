import { Server, Socket } from "socket.io";

export class Game {
  gameStatus: 'not-started' | 'in-progress' | 'finished';
  gameId: string;
  players: { id: string; score: number; name: string }[];
  io: Server;
  gameHost: string;
  paragraph: string;

  constructor(id: string, io: Server, host: string, players: { id: string; score: number; name: string }[], paragraph: string) {
    this.gameId = id;
    this.io = io;
    this.gameHost = host;
    this.players = players;
    this.paragraph = '';
    this.gameStatus = 'not-started';
  }

  setupListeners(socket: Socket) {
  }

  joinPlayer(id: string, name: string, socket: Socket) {
    if (this.gameStatus === 'in-progress')
      return socket.emit("error", "game already in progress");

    this.players.push({ id: id, score: 0, name: name });

    this.io.to(this.gameId).emit('player-joined', {
      id, name, score: 0
    });

    socket.emit('player', this.players);
    socket.emit('new-host', this.gameHost);

    this.setupListeners(socket);
  }


}
