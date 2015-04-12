var Servidores = [];
var infCliente = {};
var Cartones = [];
var nrosCantado = [];
var MatReferencia = [];
var ca,i = 1;
var p,band=0;

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
				nrosCantado[j]= nrosCantado[j]+1;
				$('#carton'+j+' a[id^=b'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=i'+k+']').text()){
				nrosCantado[j]= nrosCantado[j]+1;
				$('#carton'+j+' a[id^=i'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=n'+k+']').text()){
				nrosCantado[j]= nrosCantado[j]+1;
				$('#carton'+j+' a[id^=n'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=g'+k+']').text()){
				nrosCantado[j]= nrosCantado[j]+1;
				$('#carton'+j+' a[id^=g'+k+']').addClass('seleccion-numero');
			}
		}
		for(var k=1;k<=5;k++){
			if(numero == $('#carton'+j+' a[id^=o'+k+']').text()){
				nrosCantado[j]= nrosCantado[j]+1;
				$('#carton'+j+' a[id^=o'+k+']').addClass('seleccion-numero');
			}
		}
	}
};
 
var numerosCantados = function(numero){
	for(var i=0; i<global.nrocartones; i++){
		var CartonID = compararCarton(Cartones[i],numero);
		if(CartonID != ''){
			compararMatriz(Cartones[i],numero,i);
		}
		console.log(MatReferencia[i],Cartones[i]);
		if(chequearGanador(MatReferencia[i]) === 1){
			var json = {
				'COD' : 303,
				'IDCARTON': Cartones[i].IDCARTON,
				'NUMEROS' : Cartones[i],
				'ACIERTOS': 'unos ahi'
			}
			var mensaje = JSON.stringify(json);
			clientetcp.write(mensaje);
			console.log("Bingo Vertical");
		}

		if(chequearGanador(MatReferencia[i]) === 2){
			var json = {
				'COD' : 304,
				'IDCARTON': Cartones[i].IDCARTON,
				'NUMEROS' : Cartones[i],
				'ACIERTOS': 'unos ahi'
			}
			var mensaje = JSON.stringify(json);
			clientetcp.write(mensaje);
			console.log("Bingo Horizontal");
		}
		if(chequearGanador(MatReferencia[i]) === 3){
			var json = {
				'COD' : 305,
				'IDCARTON': Cartones[i].IDCARTON,
				'NUMEROS' : Cartones[i],
				'ACIERTOS': 'unos ahi'
			}
			var mensaje = JSON.stringify(json);
			clientetcp.write(mensaje);
			console.log("Bingo Diagonal");
		}

		if(chequearGanador(MatReferencia[i]) === 4){
			var json = {
				'COD' : 306,
				'IDCARTON': Cartones[i].IDCARTON,
				'NUMEROS' : Cartones[i],
				'ACIERTOS': 'unos ahi'
			}
			var mensaje = JSON.stringify(json);
			clientetcp.write(mensaje);
			console.log("Carton LLeno");
		}

	}
};

var compararCarton = function(carton, numero){
	for (var i=0; i<5;i++){
		for(var j=0; j<5; j++){
			if(carton.NUMEROS[i][j] === numero){
				
				return carton.IDCARTON;
			}
		}
	}
};

var compararMatriz = function(carton, numero, k){
	for (var i=0; i<5;i++){
		for(var j=0; j<5; j++){
			if(carton.NUMEROS[i][j] === numero){
				MatReferencia[k][i][j] = 1;
			}
		}
	}
};

var chequearGanador = function(referencia){

	//Bingo Horizontal
	contar =0;
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){

			contar += referencia[i][j];

		}
		if(contar == 5)
			 return formaBingo= 1;
		else
			contar =0;
	}

	//Bingo Vertical
	contar =0;
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){

			contar += referencia[j][i];

		}
		if(contar == 5)
			 return formaBingo = 2;
		else
			contar = 0;
	}

	//Bingo Diagonal
	contar=0;
	contar = referencia[0][0]+
			 referencia[1][1]+
			 referencia[2][2]+
			 referencia[3][3]+
			 referencia[4][4];

	if(contar==5)
		return formaBingo = 3;
	
	contar=0;
	contar = referencia[0][4]+
			 referencia[1][3]+
			 referencia[2][2]+
			 referencia[3][1]+
			 referencia[4][0];

	if(contar == 5)
		return formaBingo = 3;

	//Carton Lleno
	var contar=0;
	var formaBingo = 0; // 1= vertical, 2: horizontal, 3: diagonal, 4: lleno 
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){
			contar += referencia[i][j];

		}
	}

	if(contar == 25)
		return formaBingo=4;

};

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
		    		if(delete paquete['COD']){
		    			Cartones.push(paquete);
				    }

				    MatReferencia.push([[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]]);

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

		return client;
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
		    		numerosCantados(paquete.NUMERO);
		    		//console.log(paquete.NUMERO);
		    		renderizarNumeros(paquete.NUMERO);
		    	break;

		    	default:
		    }
		});

		client.bind(PORT, HOST);
	}	

}

cliente.clienteudp();
