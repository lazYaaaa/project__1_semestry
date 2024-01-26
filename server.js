const express = require('express');
const http = require('http');
const path = require("path");
const fs = require("fs");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set("port", 5000);
app.use("/static", express(__dirname + "/static"));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + "/static", "menu.html"))
    response.sendFile(path.join(__dirname + "/static", "style.css"));
    response.sendFile(path.join(__dirname + "/static", "page.html"));
    response.sendFile(path.join(__dirname + "/static", "game.js"));
});

server.listen(5000, function(){
    console.log("starting server on port 5000");
});

const players = [];
let count = 1;
io.on("connection", function(socket){
    socket.on("new player", function(){
        players.push({
            id: socket.id,
            count:count,
        });
        count ++;
        socket.emit("state", players);
    });
    socket.on("disconnect", function(){
        players.pop();
        socket.emit("state", players);
        count --;
    });
    socket.on('goPlay', function(request, response){
        response.redirect(__dirname + "/static", "page.html");
        
    })
});