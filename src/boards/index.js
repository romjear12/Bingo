// Para generar un cartón de BINGO de 75 números hay que tener en cuenta lo siguiente
// Los números no deben estar repetidos en ninguna fila-columna del cartón
// Letra B: Números NO repetidos entre 1 y 15
// Letra I: Números NO repetidos entre 16 y 30
// Letra N: Números NO repetidos entre 31 y 45
// Letra G: Números NO repetidos entre 46 y 60
// Letra O: Números NO repetidos entre 61 y 75
//
// Comparación entre carton fisico y carton generado por la función
//  B | I | N | G | O
//  3 |16 |33 |56 |72
//  8 |20 |31 |59 |75
// 15 |17 |*  |48 |69
// 10 |29 |45 |60 |67
//  9 |28 |41 |46 |65
//
// [[3, 8, 15, 10, 9], [16, 20, 17, 29, 28], [33, 31, 0, 45, 41], [56, 59, 48, 60, 46], [72, 75, 69, 67, 65]]
// El resultado es un arreglo de arreglos
// Cada posición del arreglo superior es una letra del cartón
// Cada posición de los arreglos internos, son números en posición descendente del cartón
const generarCartonAleatorio = () => {
    let columna = [];
    let carton = [];
    let i = 0;
    let numeroRandom = null;

    while (i < 25) {
        // Generar aleatoriamente los números para la columna de la letra B
        // Rango válido: 1 <= x <= 15
        if (i < 5) {
            numeroRandom = Math.floor(Math.random() * (16 - 1) + 1);
            if (columna.indexOf(numeroRandom) === -1) {
                columna.push(numeroRandom);
                i++;
            }
        }

        // Agregar la columna generada (Letra B) al cartón
        if (i === 5) {
            carton.push(columna);
            columna = [];
        }

        // Generar aleatoriamente los números para la columna de la letra I
        // Rango válido: 16 <= x <= 30
        if (i >= 5 && i < 10) {
            numeroRandom = Math.floor(Math.random() * (31 - 16) + 16);
            if (columna.indexOf(numeroRandom) === -1) {
                columna.push(numeroRandom);
                i++;
            }
        }

        // Agregar la columna generada (Letra I) al cartón
        if (i === 10) {
            carton.push(columna);
            columna = [];
        }

        // Generar aleatoriamente los números para la columna de la letra N
        // Rango válido: 31 <= x <= 45
        if (i >= 10 && i < 15) {
            // La posición 12 es la posición que está en el medio del cartón
            // La tercera posición bajando en la letra N
            // Es una posición muerta
            if (i === 12) {
                columna.push(0);
                i++;
            } else {
                numeroRandom = Math.floor(Math.random() * (46 - 31) + 31);
                if (columna.indexOf(numeroRandom) === -1) {
                    columna.push(numeroRandom);
                    i++;
                }
            }
        }

        // Agregar la columna generada (Letra N) al cartón
        if (i === 15) {
            carton.push(columna);
            columna = [];
        }

        // Generar aleatoriamente los números para la columna de la letra G
        // Rango válido: 46 <= x <= 60
        if (i >= 15 && i < 20) {
            numeroRandom = Math.floor(Math.random() * (61 - 46) + 46);
            if (columna.indexOf(numeroRandom) === -1) {
                columna.push(numeroRandom);
                i++;
            }
        }

        // Agregar la columna generada (Letra G) al cartón
        if (i === 20) {
            carton.push(columna);
            columna = [];
        }

        // Generar aleatoriamente los números para la columna de la letra O
        // Rango válido: 61 <= x <= 75
        if (i >= 20 && i <= 25) {
            numeroRandom = Math.floor(Math.random() * (76 - 61) + 61);
            if (columna.indexOf(numeroRandom) === -1) {
                columna.push(numeroRandom);
                i++;
            }
        }

        // Agregar la columna generada (Letra O) al cartón
        if (i === 25) {
            carton.push(columna);
            columna = [];
        }
    }

    return carton;
};

const numerosRepetidosColumna = columna => {
    let numeroRepetido = false;
    columna.forEach((numero_columna, index) => {
        const posicionNumeroEncontrado = columna.findIndex(elem => elem === numero_columna);

        if (posicionNumeroEncontrado !== index) {
            numeroRepetido = true;
            return numeroRepetido;
        }
    });
    return numeroRepetido;
};

// Letra B(0): Números entre 1 y 15
// Letra I(1): Números entre 16 y 30
// Letra N(2): Números entre 31 y 45
// Letra G(3): Números entre 46 y 60
// Letra O(4): Números entre 61 y 75
const validarRango = (letraCarton, numeroIngresado) => {
    let rangoValido = null;

    switch (letraCarton) {
        case 0:
            if (numeroIngresado >= 1 && numeroIngresado <= 15) {
                rangoValido = true;
            } else {
                rangoValido = false;
            }
            return rangoValido;
        case 1:
            if (numeroIngresado >= 16 && numeroIngresado <= 30) {
                rangoValido = true;
            } else {
                rangoValido = false;
            }
            return rangoValido;
        case 2:
            if (numeroIngresado >= 31 && numeroIngresado <= 45) {
                rangoValido = true;
            } else {
                rangoValido = false;
            }
            return rangoValido;
        case 3:
            if (numeroIngresado >= 46 && numeroIngresado <= 60) {
                rangoValido = true;
            } else {
                rangoValido = false;
            }
            return rangoValido;
        case 4:
            if (numeroIngresado >= 61 && numeroIngresado <= 75) {
                rangoValido = true;
            } else {
                rangoValido = false;
            }
            return rangoValido;
    }
};

/**
 *
 * @param {array}   carton          Arreglo de arreglos (carton 5 x 5)
 * @param {number}  letraCarton     Identificador de la columba. Si letraCarton = 0 se refiere a la primera columna, es decir, la letra B
 * @param {number}  numeroIngresado Número ingresado manualmente
 * @param {number}  posicionColumna Posición de la columna donde ingresó el número
 * @return {object}
 */
const validarNumeroIngresado = (carton, letraCarton, numeroIngresado, posicionColumna) => {
    const columnaCarton = carton[letraCarton];
    const rangoValido = validarRango(letraCarton, numeroIngresado);

    if (!rangoValido) {
        return {
            ok: false,
            error: 'fuera_rango',
            posicionSeleccionada: posicionColumna,
        };
    }

    const posicionNumeroEncontrado = columnaCarton.findIndex(
        numeroEnElCarton => numeroEnElCarton === numeroIngresado,
    );

    if (posicionNumeroEncontrado !== -1 && posicionNumeroEncontrado !== posicionColumna) {
        return {
            ok: false,
            error: 'repetido',
            posicionSeleccionada: posicionColumna,
            posicionOcupada: posicionNumeroEncontrado,
        };
    } else {
        return {
            ok: true,
            posicionSeleccionada: posicionColumna,
        };
    }
};

const validarCartonManualLleno = carton => {
    let numerosAcertados = 0;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (carton[j][i] !== null) {
                numerosAcertados += 1;
            }
        }
    }
    if (numerosAcertados == 25) return true;
    return false;
};

export {
    generarCartonAleatorio,
    numerosRepetidosColumna,
    validarNumeroIngresado,
    validarCartonManualLleno,
};
