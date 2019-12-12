var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var clienteServer = require('socket.io-client')('http://localhost:8080');

const { Board, Proximity } = require("johnny-five");
const board = new Board({
    port: "COM3"
});

io.on("connection", socket => {
    socket.on("enviar", res =>{
        io.emit("interfaz-res",res);
    });    
  });

board.on("ready", () => {
    const proximity = new Proximity({
        controller: "HCSR04",
        pin: 7
    });
    setTimeout(() => {
        proximity.on("change", () => {
            const { centimeters, inches } = proximity;
            
            clienteServer.emit("enviar", datos = { 
                cm: centimeters,
                in: inches
            });
    
        });
    }, 2000);
    
});


server.listen(8080);