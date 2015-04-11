var Servidores = [];
var infCliente = {};
var Cartones = [];
var nrosCantado = [];
var ca = 1;
var cliente = {
	conectartcp : function(ipservidor){
		var net = require('net');
		var HOST = ipservidor;
		var PORT = 10022;
		var client = new net.Socket();
		global.ipservidor = ipservidor;

		client.connect(PORT, HOST, function() {
		    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 

			var json = {
				'COD' : 100,
				'IP': mip,
				'CLIENTE': $("#nombre-cliente").val()
			};
			var mensaje = JSON.stringify(json);
			client.write(mensaje);		
		
			$("#-nuevapartida").on('click',function(){
				console.log("enviado");
				global.nrocartones = $("#ncartones").val();
				var json = {
					'COD' : 102,
					'NROCARTONES': $("#ncartones").val()
				};
				var mensaje = JSON.stringify(json);
				client.write(mensaje);	
				cliente.multicastescuchar();
			});

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
		    	case 101:

		    		global.IDJUEGO = paquete.IDJUEGO;

		    	break;

		    	case 103:
		    		
		    		renderizarCarton(paquete.NUMEROS);
		    		
		    	break;

		    	case 106:

		    		infCliente.razonsalida = paquete.MOTIVO;

		    	break;

		    	case 303:
		    		// bingo vertical
		    	break;

		    	case 304:
		    		// bingo horizontal
		    	break;

		    	case 305:
		    		// bingo diagonal
		    	break;

		    	case 306:
		    		// carton lleno
		    	break;

		    	default:

		    }
		    
		});

		// Add a 'close' event handler for the client socket
		client.on('close', function() {
			client.destroy();
		    console.log('Connection closed');
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
		    		$("#select_servidores").append("<option value="+paquete.IP+">Sala: "+paquete.SALA+" - IP Servidor: "+paquete.IP+"</option>");
		    		console.log('Servidor: '+paquete.IP+' - ' + message);
		    	}
		    }
		    
		});

		client.bind(10022);
	},

	multicastescuchar : function(){
		var PORT = 5554;
		var HOST = mip;
		var dgram = require('dgram');
		var client = dgram.createSocket('udp4');

		client.on('listening', function () {
		    var address = client.address();
		    console.log('UDP Client listening on ' + address.address + ":" + address.port);
		    client.setBroadcast(true)
		    client.setMulticastTTL(128); 
		    client.addMembership('239.1.2.3',HOST);
		});

		client.on('message', function (message, remote) {   
		    try{
		    	var paquete = JSON.parse(message);
		    }catch(err){
		    	console.log(err);
		    }

		    switch(paquete.COD){
		    	case 300:
		    		console.log("Se inició la partida");
		    	break;

		    	case 301:
		    		console.log("Finalizada la partida");
		    	break;

		    	case 308:
		    		console.log(paquete.NUMERO);
		    		renderizarNumeros(paquete.NUMERO);
		    	break;

		    	default:
		    }
		});

		client.bind(PORT, HOST);
	}	

}

cliente.clienteudp();

//cliente.escuchartcp();
var i = 1;
var renderizarCarton = function(numeros){
	var k = 0;
		$(".center").after(" <div class='carton' id='carton"+i+"'> </div> ");
		$("#carton"+i+"").prepend("<ul id='text-bingo'></ul>");
		$("#text-bingo").prepend("<li><a>B</a></li><li><a>I</a></li><li><a>N</a></li><li><a>G</a></li><li><a>O</a></li>");
		for (var j=1;j<=5;j++){
			$("#carton"+i+"").append("<ul class='filas' id='fila"+j+"'></ul>");
				$("#fila"+j+"").append("<li><a id='b"+j+"'></a></li>");
				$("#fila"+j+"").append("<li><a id='i"+j+"'></a></li>");
				$("#fila"+j+"").append("<li><a id='n"+j+"'></a></li>");
				$("#fila"+j+"").append("<li><a id='g"+j+"'></a></li>");
				$("#fila"+j+"").append("<li><a id='o"+j+"'></a></li>");
		}
		
		for(var k=0;k<5;k++){
			$('a[id^=b]:eq('+k+')').html(numeros[0][k]);
		}
		for(var k=0;k<5;k++){
			$('a[id^=i]:eq('+k+')').html(numeros[1][k]);
		}
		for(var k=0;k<5;k++){
			$('a[id^=n]:eq('+k+')').html(numeros[2][k]);
		}
		for(var k=0;k<5;k++){
			$('a[id^=g]:eq('+k+')').html(numeros[3][k]);
		}
		for(var k=0;k<5;k++){
			$('a[id^=o]:eq('+k+')').html(numeros[4][k]);
		}

		i++;
};

var renderizarNumeros = function(numero){
	for(var j=1;j<=global.nrocartones;j++){


		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=b'+k+']').text()){
				nrosCantado[j]== nrosCantado[j]+1;
				$('#carton'+j+' a[id^=b'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=i'+k+']').text()){
				nrosCantado[j]== nrosCantado[j]+1;
				$('#carton'+j+' a[id^=i'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=n'+k+']').text()){
				nrosCantado[j]== nrosCantado[j]+1;
				$('#carton'+j+' a[id^=n'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=g'+k+']').text()){
				nrosCantado[j]== nrosCantado[j]+1;
				$('#carton'+j+' a[id^=g'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=o'+k+']').text()){
				nrosCantado[j]== nrosCantado[j]+1;
				$('#carton'+j+' a[id^=o'+k+']').addClass('seleccion-numero');
			}
		}
	}
};