
// Obtener IP propia
var mip = function (){
	var os = require('os');
	var ifaces = os.networkInterfaces();
	var alias = 0;
	var ip;

	Object.keys(ifaces).forEach(function (ifname) {

		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
				return;
			}
			if(alias==0){
				ip= iface.address;
			}
			 alias++;
		});
	});
	return ip;
}();


// Tomar valores para crear partida
$("#anunciar-sala").on('click',function(){
	global.ParametrosJuego = {};
	global.ParametrosJuego.nombreSala = $("#nombre-sala").val();
	global.ParametrosJuego.numeroCartones = $("#cantidad-cartones").val();
});


$("#cantar-numeros").on('click',function(){
	clearInterval(servidor.serverudp.anunciarSala);
});

$("#conectar_servidor").on('click',function(){
	cliente.conectartcp(Servidores[0]);
});