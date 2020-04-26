import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io'; // new
import { Table } from './table';

export class ChatServer {

    public static readonly PORT:number = 5000;
    private app: express.Application;
    private port: string | number;
    private server: Server;
    private io: SocketIO.Server;
    private tables = [new Table(), new Table(), new Table(), new Table()];

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        this.app.use(express.static('public'));
    }

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connection', (socket) => {
            socket.on('join-table', (data) =>{
                socket.join(data.name)
                socket.in(data.name).emit('add-users',{
                    users: [socket.id]
                })
                console.log(data.name)
            })

            socket.on('leave-table', (data) =>{
                socket.leave(data.name)
                socket.in(data.name).emit('remove-users',{
                    users: [socket.id]
                })
            })

            socket.on('disconnect', () => {
                this.io.emit('remove-users', {
                    users: [socket.id]
                });
            });

            socket.on('make-offer', (data) => {
                socket.to(data.to).emit('offer-made', {
                    offer: data.offer,
                    socket: socket.id
                });
            });
            
            socket.on('make-answer', (data) => {
                socket.to(data.to).emit('answer-made', {
                    socket: socket.id,
                    answer: data.answer
                });
            });

        });
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

     
    private sockets(): void {
        this.io = socketIo(this.server);
    }

    public getApp(): express.Application {
        return this.app;
    }
}