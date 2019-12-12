var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var clienteServer = require('socket.io-client')('http://localhost:8080');

const { Board, Light, Pin } = require("johnny-five");
const board = new Board({
    port: "COM3"
});
io.on("connection", socket => {
    socket.on("enviar", res => {
        io.emit("interfaz-res", res);
    });
});
board.on("ready", function () {
    var light = new Light("A0");
    var buzzer = new Pin(8);
    light.on("change", function () {
        console.log(this.level);
        clienteServer.emit("enviar", datos = {
            luz: this.level
        });
        if (this.level < 0.70) {
            buzzer.high();
        } else {
            buzzer.low();
        }
    });
});
board.on("error", function (error) {
    console.log(error);
});

server.listen(8080);


