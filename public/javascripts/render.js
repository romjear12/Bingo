	var net = require('net');
		var HOST = global.ipservidor;
		var PORT = 10022;
		var client = new net.Socket();
		client.connect(PORT, HOST, function() {
		    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
		client.on('data', function(data) {
		    console.log('DATA: ' + data);
		    try{
		    	var paquete = JSON.parse(data);
		    }
		    catch(err){
		    	console.log(err);
		    }

		    switch(paquete.COD){

		    	case 103:
		    		global.IDCARTON = paquete.IDCARTON;
		    		console.log("llegó");
		    		renderizarcarton(paquete.NUMEROS);
		    	break;

		    }
		    
		});

		// Add a 'close' event handler for the client socket
		client.on('close', function() {
			client.destroy();
		    console.log('Connection closed');
		});

*/