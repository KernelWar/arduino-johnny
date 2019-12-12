var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var clienteServer = require('socket.io-client')('http://localhost:8080');

const { Board, Hygrometer, Thermometer  } = require("johnny-five");
const board = new Board({
    port: "COM3"
});
io.on("connection", socket => {
  socket.on("enviar", res =>{
      io.emit("interfaz-res",res);
  });
  socket.on("hola", res =>{
    console.log(res)
  });


});
board.on("ready", function() {
  const thermometer = new Thermometer({
    controller: "DHT11_I2C_NANO_BACKPACK"
  });

  var hygrometer = new Hygrometer({
    controller: "DHT11_I2C_NANO_BACKPACK"
  });
  board.repl.inject({ DHT11:hygrometer });
  hygrometer.on("change", function() {
      humedad = this.relativeHumidity;
      const {celsius, fahrenheit, kelvin} = thermometer;      
      
      if(((humedad-1) != -1) && ((celsius-1) != -1)){
        console.log("C:"+celsius);
        console.log("F:"+fahrenheit);
        console.log("K:"+kelvin);

        console.log("\n");
        console.log("\n");
        console.log("\n");
        clienteServer.emit("enviar", datos = { 
          humedad: this.relativeHumidity,
          temperatura: celsius
        });
      }
      
      
    
  });
});
board.on("error", function (error) {
    console.log(error);
});

server.listen(8080);


