var MD5 = require('MD5');
var conexiones = [];

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
		        		listarConexiones(paquete);
			        	var json = {
		        			'COD' : 101,
		        			'IDJUEGO' : MD5(global.ParametrosJuego.nombreSala)
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
			        			'NUMEROS' : numeroscarton(),
			        			'IDCARTON' : MD5(totalMD5)
			        		};
			        		
							var paquete = JSON.stringify(json);
			        		sock.write(paquete);
			  				contar++;
			  				console.log("Carton enviado"+paquete);
			  				if(contar == NumCartones)
			  					clearInterval(enviar);
			  			
			        	},200);
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

var listarConexiones = function(paquete){

	if(conexiones.indexOf(paquete.IP) == -1){
		
		$("#list-conexiones #users").append("<li class='list-li'>"+paquete.CLIENTE+"</li>");
		$("#list-conexiones #direcciones").append("<li class='list-li'>"+paquete.IP+"</li>");
		conexiones.push(paquete.IP);
	}
	
};