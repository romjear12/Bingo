var MD5 = require('MD5');
var cantados = [];
var sendBroadcast = 0;
var i=0;


var numerosrandom = function(){
	var nro = 0;
	do{
		nro = Math.floor((Math.random() * (75)) + 1);
		i++;
	}while(cantados.indexOf(nro) != -1 && i<76);
	cantados.push(nro);
	return nro;
};

var servidor = {
	serverudp : function(){
		var dgram = require('dgram');
		var server = dgram.createSocket('udp4');
		var PORT = 10022;
		var HOST = '192.168.1.255';

		var json = {
			'COD':105,
			'IP': mip,
			'SALA': global.ParametrosJuego.nombreSala
		};
		var mensaje =  new Buffer(JSON.stringify(json));

		server.bind( function() {
			server.setBroadcast(true);
		});

		var anunciarSala = setInterval(function () {
			server.send(mensaje,0, mensaje.length, PORT, HOST, function (err) {
				if (err) console.log(err);
					console.log("Anunciando Sala");
				}
			);

			if(sendBroadcast==1)
				clearInterval(anunciarSala);
			
		}, 1000);

		server.on('close', function(){
			server.destroy();
		});

	},

	multicastcantar : function(){
		var dgram = require('dgram');
		var socket = dgram.createSocket('udp4');
		var i = 1;
		var multicastAddress = '239.1.2.3';
		var multicastPort = 5554;
		 
		$("#cantar-numeros").on('click',function(){

			socket.bind(multicastPort,'0.0.0.0', function(){
				socket.setBroadcast(true);
				socket.setMulticastTTL(128);
				socket.addMembership(multicastAddress,mip);	
			});	
			var json = {
				'COD' : 300,
				'IDJUEGO' : MD5(global.ParametrosJuego.nombreSala)
			};

			var mensaje = JSON.stringify(json);

			socket.send(new Buffer(mensaje), 0, mensaje.length, multicastPort, multicastAddress, function (err) {
						if (err) console.log(err);
							console.log("Anuncio de juego "+json.IDJUEGO);
						}
			);
			sendBroadcast = 1;

			setInterval(function () {
				var json = {
					'COD' : 308,
					'NROJUGADA': i,
					'NUMERO' : numerosrandom(),
					'IDJUEGO' : MD5(global.ParametrosJuego.nombreSala)
				};

				var mensaje = JSON.stringify(json);

				socket.send(new Buffer(mensaje), 
						0, 
						mensaje.length, 
						multicastPort, 
						multicastAddress, 
						function (err) {
							if (err) console.log(err);
							console.log("Jugada: "+json.NROJUGADA, json.NUMERO);
						}
				);
				i++;
			}, 1000);	
		});		
	}
}

servidor.serverudp();

servidor.multicastcantar();
