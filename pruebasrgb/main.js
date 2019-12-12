var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


const { Board, Led } = require("johnny-five");
const board = new Board({
    port: "COM4"
});
board.on("ready", () => {
    const led = new Led.RGB({
        pins: {
            red: 3,
            green: 5,
            blue: 6
        }
    });
    board.repl.inject({ LEDRGB:led });
    led.on();
    led.color("#FFFFFF");

    io.on("connection", socket => {
        socket.on("hola", res =>{
            console.log("hola");
        });
        
        socket.on("colorElegido", res =>{
            console.log("COLOR: ",res);
            led.color(res);
        });
    });
    

});
board.on("error", function (error) {
    console.log(error);
});



server.listen(8080);




/*

const { Board, Led } = require("johnny-five");
const board = new Board({
    port: "COM3"
});

board.on("ready", () => {
    const led = new Led.RGB({
        pins: {
            red: 3,
            green: 5,
            blue: 6
        }
    });
    board.repl.inject({ LEDRGB:led });
    led.on();
    led.color("#77FF00");

});
board.on("error", function (error) {
    console.log(error);
});

*/