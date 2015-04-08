var Servidores = [];
var infCliente = {};
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


			$("#conectar_servidor").on('click',function(){

				var json = {
					'COD' : 100,
					'NROCARTONES': mip
				};
				var mensaje = JSON.stringify(json);
				client.write(mensaje);	
			});
			
			$("#-nuevapartida").on('click',function(){
				global.nrocartones = $("#ncartones").val();
				var json = {
					'COD' : 102,
					'NROCARTONES': $("#ncartones").val()
				};
				var mensaje = JSON.stringify(json);
				client.write(mensaje);	
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
		    		//global.IDCARTON = paquete.IDCARTON;
		    		//console.log("llegó");
		    		renderizarcarton(paquete.NUMEROS);
		    	break;

		    	case 106:
		    		infCliente.razonsalida = paquete.MOTIVO;
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
		    		$("#select_servidores").append("<option value="+paquete.ip+">Sala: "+paquete.SALA+" - IP Servidor: "+paquete.IP+"</option>");
		    		console.log('Servidor: '+remote.address+' - ' + message);
		    	}
		    }

		});

		client.bind(10022);
	}

}

cliente.clienteudp();

//cliente.escuchartcp();
var i = 1;
var renderizarcarton = function(numeros){
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

}