var http = require('http');
var express = require('express');
var app = express();
var serialport = require("serialport");
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);

var SerialPort = serialport.SerialPort;

app.use(express.static(__dirname + '/client/public'));

serialport.list( function (err, ports) {
    // show our arduino comName
    //console.log(ports);

    // define a variable using our arduino comName
    var arduino = new SerialPort(ports[1].comName, {
      baudrate: 9600,
      parser: serialport.parsers.readline("\n")
    });

    arduino.on('open', function() {
        console.log('Waiting for Arduino data...');

        io.sockets.on('connection', function (socket) {
            console.log('Socket connected');
            socket.emit('connected');

            arduino.on('data', function(data) {
                console.log(data);
                socket.emit('data', data);
            });

            socket.on('callback', function(data) {
                console.log('LLEGOOOOOOO');
                arduino.write(' NODE > ' + data);
            });
        });
    });

    arduino.on('close', function() {
        console.log('Connection closed');
        socket.emit('disconnect');
    });

    arduino.on('error', function(error) {
        console.log('Error detected: ', error);
    });

    setTimeout(function () {
        //arduino.write(' NODE > jue jue');
    }, 2000)
});
