var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const { Board, Servo } = require("johnny-five");
const board = new Board({
  port: "COM3"
});


board.on("ready", () => {
  const servo = new Servo(10);

  board.repl.inject({
    servo
  });
  io.on("connection", socket => {    
    socket.on("saludo", res =>{
      console.log("hola mundo");
    });
    socket.on("moverServo", res =>{
      grados = res["grados"];
      servo.to(grados);
    });
  });

});


server.listen(8080);