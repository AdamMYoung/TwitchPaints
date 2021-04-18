const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
var cors = require('cors');
const { opts } = require('./config');
const tmi = require('tmi.js');

app.use(cors());
//Twitch chatbot stuff

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot

    // Remove whitespace from chat message
    const message = msg.trim();
    const command = message.split(' ');

    // If the command is known, let's execute it
    if (command[0] === '!pixel') {
        const x = parseInt(command[1]);
        const y = parseInt(command[2]);
        const color = command[3];

        if (isNaN(x) || isNaN(y) || typeof color !== 'string') {
            console.log('Invalid request format');
            return;
        }

        io.emit('pixel', { x, y, color });

        console.log(`* Executed !pixel ${x} ${y} ${color}`);
    } else if (command[0] === '!line') {
        const x1 = parseInt(command[1]);
        const y1 = parseInt(command[2]);
        const x2 = parseInt(command[3]);
        const y2 = parseInt(command[4]);
        const color = command[5];

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || typeof color !== 'string') {
            console.log('Invalid request format');
            return;
        }

        io.emit('line', { x1, y1, x2, y2, color });
    } else if (command[0] === '!circle') {
        const x = parseInt(command[1]);
        const y = parseInt(command[2]);
        const radius = parseInt(command[3]);
        const color = command[4];

        if (isNaN(x) || isNaN(y) || isNaN(radius) || typeof color !== 'string') {
            console.log('Invalid request format');
            return;
        }

        io.emit('circle', { x, y, radius, color });
    } else if (command[0] === '!rectangle') {
        const x1 = parseInt(command[1]);
        const y1 = parseInt(command[2]);
        const x2 = parseInt(command[3]);
        const y2 = parseInt(command[4]);
        const color = command[5];

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || typeof color !== 'string') {
            console.log('Invalid request format');
            return;
        }

        io.emit('rectangle', { x1, y1, x2, y2, color });
    }

    io.emit('chat', { username: context.username, message });
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// Socket.io stuff

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});
