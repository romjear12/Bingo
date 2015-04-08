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
		        		var enviar = setInterval(function(){
			        		var json = {
			        			'COD' : 103,
			        			'IDCARTON' : 555,
			        			'NUMEROS' : numeroscarton()
			        		};

							var paquete = JSON.stringify(json);
				        	
			        		sock.write(paquete);
			  				
			  				contar++;
			  				console.log("enviado");
			  				if(contar == NumCartones)
			  					clearInterval(enviar);
			  			
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



//escuchar peticiones tcp
servertcp();

