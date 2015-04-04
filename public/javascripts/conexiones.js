var cartones =  require('../public/javascripts/cartones.js');

var json = {
	'COD':105,
	'IP': mip,
	'SALA': global.nombresala
};

// Anunciar Sala
servidor.serverudp(json);

/*var multicast = function(json){
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

multicast(json1);*/

//escuchando solicitudes TCP
var servertcp = function(){
		var net = require('net');
		var HOST = mip;
		var PORT = 10022;

		// Create a server instance, and chain the listen function to it
		// The function passed to net.createServer() becomes the event handler for the 'connection' event
		// The sock object the callback function receives UNIQUE for each connection
		net.createServer(function(sock) {
		    
		    // We have a connection - a socket object is assigned to the connection automatically
		    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
		    
		    // Add a 'data' event handler to this instance of socket
		    sock.on('data', function(data) {
		        
		        console.log('DATA ' + sock.remoteAddress + ': ' + data);
		        try{
		        	var paquete = JSON.parse(data);	
		        }
		        catch(err){
		        	console.log(err);
		        }

		         // Write the data back to the socket, the client will receive it as data from the server
		        switch(paquete.COD){
		        	//var NumCartones = paquete.NROCARTONES;

		        	case 100:
			        	var json = {
		        			'COD' : 101,
		        			'IDJUEGO' : 555
			        	};
			        	var paquete = JSON.stringify(json);
			        	sock.write(paquete);
			        	console.log(paquete);
		        	break;

		        	case 102:
		        		var NumCartones = paquete.NROCARTONES;
		        		var contar = 0;
		        		var interval = setInterval(function(){
			        		var json = {
			        			'COD' : 103,
			        			'IDCARTON' : 555,
			        			'NUMEROS' : numeroscarton()
			        		};

							var paquete = JSON.stringify(json);
				        	
			        		sock.write(paquete);
			  				
			  				contar++;

			  				if(contar == NumCartones)
			  					clearInterval(interval);
			  			
			        	},50);
		        	break;


		        	default:
		    	}

		    
		    });
		    // Add a 'close' event handler to this instance of socket
		    sock.on('close', function(data) {
		        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
		    });
		    
		}).listen(PORT, HOST);

		console.log('Server listening on ' + HOST +':'+ PORT);
	}

servertcp();
