var arreglo = [];
var matriz = [];
var totalMD5;
var numeroscarton = function (){
		arreglo = [];
		matriz = [];
		var i,valor;
		totalMD5 = 0;
	    i=0;

	    while(i<25){
	        if(i<5){
	            valor = Math.floor((Math.random() * (16-1)) + 1);
	            if(arreglo.indexOf(valor)==-1){
	                arreglo.push(valor);
	                i++;
	            }
	        }
	        if(i==5){
	        	matriz.push(arreglo);
				for(var j=0;j<arreglo.length;j++){
					totalMD5 += arreglo[j];
				}
	        	arreglo = [];
	        }
	        if(i>=5 && i<10){
	            valor = Math.floor((Math.random() * (31-16)) + 16);
	            if(arreglo.indexOf(valor)==-1){
	                arreglo.push(valor); 
	                i++;
	            }
	        }
	        if(i==10){
	        	matriz.push(arreglo);
	        	for(var j=0;j<arreglo.length;j++){
					totalMD5 += arreglo[j];
				}
	        	arreglo = [];
	        }
	        if(i>=10 && i<15 && i!=12){
	            valor= Math.floor((Math.random() * (46-31)) + 31);
	            if(arreglo.indexOf(valor)==-1){
	                arreglo.push(valor); 
	                i++;
	            }
	        }
	        if(i==12){
	        	arreglo.push(0);
	        	i++;
	        }
	        if(i==15){
	        	matriz.push(arreglo);
	        	for(var j=0;j<arreglo.length;j++){
					totalMD5 += arreglo[j];
				}
	        	arreglo = [];
	        }
	        if(i>=15 && i<20){
	            valor= Math.floor((Math.random() * (61-46)) + 46);
	            if(arreglo.indexOf(valor)==-1){
	                arreglo.push(valor); 
	                i++;
	            }
	        }
	        if(i==20){
	        	matriz.push(arreglo);
	        	for(var j=0;j<arreglo.length;j++){
					totalMD5 += arreglo[j];
				}
	        	arreglo = [];
	        }
	        if(i>=20 && i<=25){
	            valor= Math.floor((Math.random() * (76-61)) + 61);
	            if(arreglo.indexOf(valor)==-1){
	                arreglo.push(valor); 
	                i++;
	            }
	        }if(i==25){
	        	matriz.push(arreglo);
	        	for(var j=0;j<arreglo.length;j++){
					totalMD5 += arreglo[j];
				}
	        	arreglo = [];
	        }
	    }

    return matriz;

};

var cartonMD5 = function(){

	return totalMD5;

}();



