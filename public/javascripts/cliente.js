var Servidores = [];

var cliente = {

	conectartcp : function(ipservidor){
		var net = require('net');
		var HOST = ipservidor;
		var PORT = 10022;
		var client = new net.Socket();

		client.connect(PORT, HOST, function() {
		    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 


			$("#nueva-partida").on('click',function(){
				var json = {
					'COD' : 102,
					'NROCARTONES': 1
				};

				var mensaje = JSON.stringify(json);

				client.write(mensaje);	
			});
			
		});

		// Add a 'close' event handler for the client socket
		client.on('close', function() {
			client.destroy();
		    console.log('Connection closed');
		});
	},

	enviartcp : function(ipservidor){
		var net = require('net');
		var HOST = ipservidor;
		var PORT = 10022;
		var client = new net.Socket();

		var json = {
			'COD' : 102,
			'NROCARTONES': 1
		};

		client.connect(PORT, HOST, function() {
		    client.write(json);
		    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});

		

	},

	escuchartcp : function(){
		// Add a 'data' event handler for the client socket
		// data is what the server sent to this socket
		client.on('data', function(data) {
		    console.log('DATA: ' + data);
		    try{
		    	var paquete = JSON.parse(data);
		    }
		    catch(err){
		    	console.log(err);
		    }

		    switch(paquete.COD){
		    	case 101:
		    		infCliente.IDJUEGO = paquete.IDJUEGO;

		    	break;

		    	case 103:
		    		infCliente.IDCARTON = paquete.IDCARTON;
		    		infCliente.NUMEROS = paquete.NUMEROS;

		    	break;

		    	case 106:
		    		infCliente.razonsalida = paquete.MOTIVO;
		    	break;

		    	default:

		    }
		    // Close the client socket completely
		    client.destroy();
		    
		});

	},

	clienteudp : function(){
		var dgram = require('dgram');
		var client = dgram.createSocket('udp4');

		client.on('message', function(message,remote) {
			try{
				var paquete = JSON.parse(message);
			}
			catch(err){
				console.log(err);
			}

		    if(paquete.COD == 105){

		    	if(Servidores.indexOf(paquete.IP)== -1){
		    		Servidores.push(paquete.IP);
		    		$("#select_servidores").append("<option value="+paquete.ip+">Sala: "+paquete.SALA+" - IP Servidor: "+paquete.IP+"</option>");
		    		console.log('Servidor: '+remote.address+' - ' + message);
		    	}
		    }

		});

		client.bind(10022);
	}

}

cliente.clienteudp();