var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clienteServer = require('socket.io-client')('http://localhost:8080');

const { Board, Pin } = require("johnny-five");
const board = new Board({
    port: "COM3"
});

board.on("ready", function () {
    this.pinMode(9, Pin.PWM);
    this.pinMode(10, Pin.PWM);
    io.on("connection", socket => {
        socket.on("cVelocidad", res => {
            var cV = (res.velocidad*255)/100;
            if(res.sentido == 0){
                this.analogWrite(9,cV);
                this.analogWrite(10,0);        
            }else{
                this.analogWrite(10,cV);
                this.analogWrite(9,0);        
            }
            
        });
    });    
    
});
board.on("error", function (error) {
    console.log(error);
});




server.listen(8080);


