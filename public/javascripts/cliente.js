var Servidores = [];
var infCliente = {};
var Cartones = [];
var nrosCantado = [];
var ca = 1;
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

var numerosCantados = function(numero){
	for(var i=0;i<Cartones.length;i++){
		console.log(Cartones[i]);
		Cartones[i].Referencia = compararCarton(Cartones[i],numero);
		console.log("probando");
/*		if(chequearGanador === 1)
			console.log("Bingo Vertical");

		if(chequearGanador === 2)
			console.log("Bingo Horizontal");

		if(chequearGanador === 3)
			console.log("Bingo Diagonal");

		if(chequearGanador === 4)
			console.log("Carton LLeno");*/

	}
};

var compararCarton = function(carton,numero){
	for (var i=0; i<5;i++){
		for(var j=0; j<5; j++){
			if(carton.NUMEROS[i][j] === numero){
				carton.Referencia[i][j]= 1;
			}
		}
		return carton.Referencia;
	}
};

/*var chequearGanador = function(carton){

	//Bingo Vertical
	contar =0;
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){

			contar += carton.Referencia[j][i];

		}
		if(contar == 5)
			formaBingo= 1;
		else
			contar =0;
			
	}

	//Bingo Horizontal
	contar =0;
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){

			contar += carton.Referencia[i][j];

		}
		if(contar == 5)
			formaBingo= 2;
		else
			contar =0;

	}

	//Bingo Diagonal
	contar=0;
	contar = carton.Referencia[0][0]+
			 carton.Referencia[1][1]+
			 carton.Referencia[2][2]+
			 carton.Referencia[3][3]+
			 carton.Referencia[4][4];

	if(contar==5)
		formaBingo = 3;
	
	contar=0;
	contar = carton.Referencia[0][4]+
			 carton.Referencia[1][3]+
			 carton.Referencia[2][2]+
			 carton.Referencia[3][1]+
			 carton.Referencia[4][0];

	if(contar == 5)
		formaBingo = 3;

	//Carton Lleno
	var contar=0;
	var formaBingo = 0; // 1= vertical, 2: horizontal, 3: diagonal, 4: lleno 
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){
			contar += carton.Referencia[i][j];

		}
	}
	console.log(contar);
	if(contar == 25)
		formaBingo=4;

	return formaBingo;
}();*/

var cliente = {
	conectartcp : function(ipservidor){
		var net = require('net');
		var HOST = ipservidor;
		var PORT = 10022;
		var client = new net.Socket();
		global.ipservidor = ipservidor;
		//var MatReferencia = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];

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
		    		if(delete paquete['COD']){
		    			Cartones.push(paquete);
				  
				    }

		    		renderizarCarton(paquete.NUMEROS);
		    		
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
		    		numerosCantados(paquete.NUMERO);
		    	break;

		    	default:
		    }
		});

		client.bind(PORT, HOST);
	}	

}

cliente.clienteudp();
