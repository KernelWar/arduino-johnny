var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var clienteServer = require('socket.io-client')('http://localhost:4088');
const { Board, Sensor, Pin} = require("johnny-five");
const board = new Board({
    port: "COM3"
});

io.on("connection", socket => {
    socket.on("saludo", res => {
        console.log("hola mundo");
    });
    socket.on("enviar", res => {
        io.emit("interfaz-res", res);
    });
    
});
board.on("ready", () => {
    var sensor = new Sensor({
        pin: "A0"
    });


    sensor.on("change", (data) => {
        //board.samplingInterval(500);
        if (sensor.value >= 420 && sensor.value <= 1022) {
            h = ((1023-sensor.value) * 100) / 603;
            clienteServer.emit("enviar", datos = {
                humedad: h
            });
        }
    });
    sensor.on("data", (data) =>{
        //board.samplingInterval(500);
        //console.log(data)
        if(data == 1023){
            clienteServer.emit("enviar", datos = {
                humedad: 0
            });
        }
    });
    

    //board.samplingInterval(1000);
    //console.log(sensor.scaleTo(0, 1023));
});


server.listen(4088);