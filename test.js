var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

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
        arduino.on('data', function(data) {
            console.log(data);
        });
    });

    arduino.on('close', function() {
        console.log('Connection closed');
    });

    arduino.on('error', function(error) {
        console.log('Error detected: ', error);
    });

    setTimeout(function () {
        arduino.write(' NODE > jue jue');
    }, 2000)

});
