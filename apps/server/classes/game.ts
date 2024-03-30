import { Server, Socket } from "socket.io";
import { rooms } from "../setupListeners";
import { generateParagraph } from "../utils/generateParagraph";

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
    socket.on('start-game', async () => {
      if (this.gameStatus === 'in-progress')
        return socket.emit('error', 'game already in progress');

      if (this.gameHost !== socket.id)
        return socket.emit('error', 'you are not a host, only the host can start the game!');

      for (const player of this.players) {
        player.score = 0;
      }

      this.io.to(this.gameId).emit('players', this.players);

      this.gameStatus = 'in-progress';

      const paragraph = await generateParagraph();

      this.paragraph = paragraph;

      this.io.to(this.gameId).emit('game-started', paragraph);

      setTimeout(() => {
        this.gameStatus = 'finished';
        this.io.to(this.gameId).emit('game-finished');
        this.io.to(this.gameId).emit('players', this.players)
      }, 60000)
    });

    socket.on('player-typed', (typed: string) => {
      if (this.gameStatus !== 'in-progress')
        return socket.emit('error', 'the game has not started');

      const splittedParagraph = this.paragraph.split('');
      const splittedTyped = typed.split('');

      let score = 0;

      for (let i = 0; i < splittedTyped.length; i++) {
        if (splittedTyped[i] === splittedParagraph[i]) {
          score++;
        }
        else {
          break;
        }
      }

      const player = this.players.find(player => player.id === socket.id);

      if (player)
        player.score = score;

      this.io.to(this.gameId).emit('player-score', { id: socket.id, score });
    });

    socket.on('leave', () => {
      const isHost = socket.id === this.gameHost;
      
      this.players = this.players.filter((player) => player.id !== socket.id);
      
      if (isHost && this.players.length > 0) {
        this.gameHost = this.players[0].id;
        this.io.to(this.gameId).emit('new-host', this.gameHost);
      } else if (isHost && this.players.length === 0) {
        rooms.delete(this.gameId);
      }
      
      socket.leave(this.gameId);
      this.io.to(this.gameId).emit('player-left', socket.id);
    });
    
    socket.on('disconnect', () => {
      const isHost = socket.id === this.gameHost;
      
      this.players = this.players.filter((player) => player.id !== socket.id);
      
      if (isHost && this.players.length > 0) {
        this.gameHost = this.players[0].id;
        this.io.to(this.gameId).emit('new-host', this.gameHost);
      } else if (isHost && this.players.length === 0) {
        rooms.delete(this.gameId);
      }
      
      socket.leave(this.gameId);
      this.io.to(this.gameId).emit('player-left', socket.id);
    });
    
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
