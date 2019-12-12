var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var clienteServer = require('socket.io-client')('http://localhost:8080');

const { Board, Pin } = require("johnny-five");
const board = new Board({
    port: "COM3"
});
var inactividad = 0;
var t1 = Date.now();
var t2 = 0;



io.on("connection", socket => {
    socket.on("enviar", res =>{
        io.emit("interfaz-res",res);
    });    
  });

board.on("ready", () => {
    var sensor = new Pin(8);    
    Pin.read(sensor,function(error,value){                
        if(value){
            t2 = Date.now();
            var tEvento = t2-t1;
            t1 = Date.now();
            var frecuencia = 1000/tEvento;
            var rpm = frecuencia*60;
            clienteServer.emit("enviar",{
                velocidad: rpm
            });
            inactividad = 0;
            //console.log(rpm);
        }else{
            inactividad++;
            if(inactividad == 50){
                clienteServer.emit("enviar",{
                    velocidad: 0
                });
                inactividad = 0;
            }
        }
       
    });
});


server.listen(8080);