export const generarNumeroRandom = numerosCantados => {
    let numero = 0;
    do {
        numero = Math.floor(Math.random() * 75 + 1);
    } while (numerosCantados.indexOf(numero) != -1);

    // numerosCantados.push(numero);

    return numero;
};

export const generarCartonesSorteo = cartones => {
    const cartonesSorteo = [{}];
    for (let i = 0; i < cartones.length; i++) {
        cartonesSorteo[i].id = i + 1;
        cartonesSorteo[i].cartonFisico = cartones[i];
        cartonesSorteo[i].cartonLogico = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, true, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
        ];
    }

    return cartonesSorteo;
};

export const cantarNumero = () => {
    const numero = generarNumeroRandom();
    marcarNumeroCarton(numero);
};

export const marcarNumeroCarton = (numeroCantado, carton) => {
    // columnas (B,I,N,G,O)
    for (let i = 0; i < carton.cartonFisico.length; i++) {
        // filas
        for (let j = 0; j < carton.cartonFisico[i].length; j++) {
            if (numeroCantado === carton.cartonFisico[i][j]) {
                carton.cartonLogico[i][j] = true;
            }
        }
    }
};

export const verificarGanador = cartonesSorteo => {
    const ganadores = [];
    for (let i = 0; i < cartonesSorteo.length; i++) {
        if (bingoHorizontal(cartonesSorteo[i].cartonLogico)) {
            ganadores.push({
                id: cartonesSorteo[i].id,
                mode: 'Bingo horizontal',
            });
        }
        if (bingoVertical(cartonesSorteo[i].cartonLogico)) {
            ganadores.push({
                id: cartonesSorteo[i].id,
                mode: 'Bingo vertical',
            });
        }
        if (cartonLleno(cartonesSorteo[i].cartonLogico)) {
            ganadores.push({
                id: cartonesSorteo[i].id,
                mode: 'Carton lleno',
            });
        }
    }
    return ganadores;
};

export const bingoVertical = carton => {
    for (let i = 0; i < 5; i++) {
        const numerosAcertados = carton[i].reduce((a, b) => {
            if (a) {
                return a + b;
            }
            return 0;
        });
        if (numerosAcertados === 5) {
            return true;
        }
    }
    return false;
};

export const bingoHorizontal = carton => {
    let numerosAcertados = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (carton[j][i]) {
                numerosAcertados += 1;
            }
        }
        if (numerosAcertados == 5) return true;
        else numerosAcertados = 0;
    }
    return false;
};

export const cartonLleno = carton => {
    let numerosAcertados = 0;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (carton[j][i]) {
                numerosAcertados += 1;
            }
        }
    }
    if (numerosAcertados == 25) return true;
    return false;
};
