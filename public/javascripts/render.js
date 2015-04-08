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
/*var renderizarcarton = function(numeros){
	console.log(numeros);

	for(var i=global.nrocartones;i>=1;i--){

		$("body").prepend(" <div class='carton' id='carton"+i+"'> </div> ");
		$("#carton"+i+"").prepend("<ul id='text-bingo'></ul>");
		$("#text-bingo").prepend("<li><a>B</a></li><li><a>I</a></li><li><a>N</a></li><li><a>G</a></li><li><a>O</a></li>");
		for (var j=1;j<=5;j++){
			$("#carton"+i+"").append("<ul class='filas' id='fila"+j+"'></ul>");
				$("#fila"+j+"").prepend("<li><a id='b"+j+"'></a></li>");
				$("#fila"+j+"").prepend("<li><a id='i"+j+"'></a></li>");
				$("#fila"+j+"").prepend("<li><a id='n"+j+"'></a></li>");
				$("#fila"+j+"").prepend("<li><a id='g"+j+"'></a></li>");
				$("#fila"+j+"").prepend("<li><a id='o"+j+"'></a></li>");
		}
	}	

}
*/