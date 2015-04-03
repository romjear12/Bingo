var mip = function (){
	var os = require('os');
	var ifaces = os.networkInterfaces();
	var alias = 0;
	var ip;Object.keys(ifaces).forEach(function (ifname) {

	ifaces[ifname].forEach(function (iface) {
	if ('IPv4' !== iface.family || iface.internal !== false) {
		// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
		return;
	}
	if(alias==0){
		ip= iface.address;
	}
	 alias++;
	});
	});
	return ip;
}();

var servidor = {

	serverudp : function(paquete){
		var dgram = require('dgram');
		var server = dgram.createSocket('udp4');
		var PORT = 10022;
		var HOST = '192.168.1.255';

		var mensaje =  new Buffer(JSON.stringify(paquete));

		server.bind( function() {
			server.setBroadcast(true);
		});
		setInterval(function () {
			server.send(mensaje,
					0, 
					mensaje.length, 
					PORT, 
					HOST, 
					function (err) {
						if (err) console.log(err);
						console.log('conectado');
					}
			);
			
		}, 1000);

	},

	multicast: function(json){
		var dgram = require('dgram');
		var server = dgram.createSocket('udp4');	 
		var multicastAddress = '239.1.2.3';
		var multicastPort = 5554;

		server.bind(multicastPort, '0.0.0.0',function(){
			server.addMembership(multicastAddress);
			server.setMulticastTTL(128);
			server.setBroadcast(true);
		});

	    var message = new Buffer(JSON.stringify(json));
	    server.send(message, 0, message.length, multicastPort, multicastAddress, function(err){
	    	if (err) console.log(err);
		    console.log("Sent " + message + " to the wire...");
	    });			
	}
}
