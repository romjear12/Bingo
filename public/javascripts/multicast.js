
var json1 = {
	'COD':300,
	'IDJUEGO': 1,
};

var multicast = function(){
		var dgram = require('dgram');
		var socket = dgram.createSocket('udp4');
		 
		var testMessage = "[hello world] pid: " + process.pid;
		var multicastAddress = '239.1.2.3';
		var multicastPort = 5554;
		 
		
		socket.bind(multicastPort, function(){
			socket.setBroadcast(true);
			socket.setMulticastTTL(128);
			socket.addMembership(multicastAddress,mip);	

			setInterval(function () {
				socket.send(new Buffer(testMessage), 
						0, 
						testMessage.length, 
						multicastPort, 
						multicastAddress, 
						function (err) {
							if (err) console.log(err);
							console.log("Message sent from "+multicastAddress, multicastPort);
						}
				);
			}, 1000);	
		});
		
		/*socket.on("message", function ( data, rinfo ) {
			console.log("Message received from ", rinfo.address, " : ", data.toString());
		});*/
		 
}


multicast();