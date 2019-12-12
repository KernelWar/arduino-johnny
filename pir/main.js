const {Board, Pin, Led} = require("johnny-five");
const board = new Board({
  port: "COM3"
});

board.on("ready", () => {
  var sensor = new Pin(8);
  var led = new Led(9);
  sensor.read(function(error, value) {
    if(value){
        led.on();
    }else{
        led.off();
    }
    
  });

});
board.on("error",function(error){
  console.log(error);
});