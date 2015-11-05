(function(){
    'use strict';
    angular.module('PatchDart', [])

    .controller('mainController', function() {
        var main = this;

        main.ranking = [
          //{ name: 'Max', value: 4500 },
          //{ name: 'Min', value: 0 },
          //{ name: 'Med', value: 2000 }
        ];

        // Socket configuration
        var socket = io.connect('http://localhost:3000');
        main.socket = false;

        socket.on('connected', function(){
            main.socket = true;
            //console.log("Socket Connected");
            //document.getElementById('dialogue').innerHTML = 'Socket Connected';
        });

        socket.on('disconnect', function(){
            main.socket = false;
            //console.log("Socket Disconnected");
            //document.getElementById('dialogue').innerHTML = 'Socket Disconnected';
        });

        socket.on('data', function (data) {
            if (data.length > 1 && main.name.length) {
                var newScore = {};
                newScore.name = main.name;
                newScore.value = data;
                main.ranking.push(newScore);
                main.name = '';

                //console.log("Data: ", data);
                // Convert if data is millis()
                //var dataToSeconds = (data * 0.1).toFixed(1);
                //document.getElementById('box').innerHTML = "Received data: " + data;
            }
        });

        /*
        // Timeout to send callback
        setTimeout(function () {
            console.log("testinggg send");
            socket.emit('callback', 'testinggg');
        }, 2000)
        */

    });

})();
