// Importing required modules
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000

// Listening to the server
http.listen(PORT, () => {
    console.log(`Listening to the server on Port ${PORT}`);
});

// middleware -> used to identify the static files
app.use(express.static(__dirname + '/public'));

// routing
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
}) 

//set up socket.io
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})