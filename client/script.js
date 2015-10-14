var socket = io.connect('http://localhost:3000');

socket.on('connected', function(){
    console.log("Socket Connected");
    document.getElementById('dialogue').innerHTML = 'Socket Connected';
});

socket.on('disconnect', function(){
    console.log("Socket Disconnected");
    document.getElementById('dialogue').innerHTML = 'Socket Disconnected';
});

socket.on('data', function (data) {
    if (data.length > 1 ) {
        console.log("Data: ", data);
        //var dataToSeconds = (data * 0.1).toFixed(1);
        document.getElementById('box').innerHTML = "Received data: " + data;
    };
});

setTimeout(function () {
    console.log("testinggg send");
    socket.emit('callback', 'testinggg');
}, 2000)
