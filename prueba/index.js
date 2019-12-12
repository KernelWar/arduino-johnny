const {Board, Led} = require("johnny-five");
const board = new Board({
  port: "COM3"
});

board.on("ready", () => {
  const led = new Led(13);
  led.blink(500);
});
board.on("error",function(error){
  console.log(error);
});