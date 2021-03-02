import { marcarNumeroCarton, generarNumeroRandom, verificarGanador } from './index';

test('Generar numeros aleatorios (no repetidos) para el cartón con cartón vacío', () => {
    const numerosCantados = [];

    for (let index = 0; index < 75; index++) {
        const numero = generarNumeroRandom(numerosCantados);
        numerosCantados.push(numero);
    }
    expect(numerosCantados.length).toBe(75);
});

describe('Marcar número cantado en el cartón', () => {
    test('Marcar numeros cantados que está presente en el cartón', () => {
        const carton = {
            cartonFisico: [
                [3, 8, 15, 10, 9],
                [16, 20, 17, 29, 28],
                [33, 31, 0, 45, 41],
                [56, 59, 48, 60, 46],
                [72, 75, 69, 67, 65],
            ],
            cartonLogico: [
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
            ],
        };

        const numeroCantado = 3;
        marcarNumeroCarton(numeroCantado, carton);
        expect(carton.cartonLogico[0][0]).toBe(true);

        const otroNumeroCantado = 69;
        marcarNumeroCarton(otroNumeroCantado, carton);
        expect(carton.cartonLogico[0][0]).toBe(true);
        expect(carton.cartonLogico[4][2]).toBe(true);
    });

    test('No marcar numero cantado que no está presente en el cartón', () => {
        const numeroCantado = 2;
        const carton = {
            cartonFisico: [
                [3, 8, 15, 10, 9],
                [16, 20, 17, 29, 28],
                [33, 31, 0, 45, 41],
                [56, 59, 48, 60, 46],
                [72, 75, 69, 67, 65],
            ],
            cartonLogico: [
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
            ],
        };

        marcarNumeroCarton(numeroCantado, carton);
        expect(carton.cartonLogico[0][0]).toBe(null);
    });
});

describe('Cartones ganadores', () => {
    test('Carton con linea horizontal', () => {
        const cartonesSorteo = [
            {
                id: 1,
                cartonFisico: [
                    [3, 8, 15, 10, 9],
                    [16, 20, 17, 29, 28],
                    [33, 31, 0, 45, 41],
                    [56, 59, 48, 60, 46],
                    [72, 75, 69, 67, 65],
                ],
                cartonLogico: [
                    [null, null, null, null, null],
                    [true, true, true, true, true],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                ],
            },
            {
                id: 2,
                cartonFisico: [
                    [3, 15, 8, 10, 9],
                    [16, 20, 17, 29, 28],
                    [33, 31, 0, 45, 41],
                    [56, 59, 48, 60, 46],
                    [72, 75, 69, 67, 65],
                ],
                cartonLogico: [
                    [true, true, true, true, true],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                ],
            },
        ];

        const cartonezGanadoresHorizontal = verificarGanador(cartonesSorteo);
        expect(cartonezGanadoresHorizontal.length).toBe(2);
    });
    test('Carton con linea vertical', () => {
        const cartonesSorteo = [
            {
                id: 1,
                cartonFisico: [
                    [3, 8, 15, 10, 9],
                    [16, 20, 17, 29, 28],
                    [33, 31, 0, 45, 41],
                    [56, 59, 48, 60, 46],
                    [72, 75, 69, 67, 65],
                ],
                cartonLogico: [
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                ],
            },
            {
                id: 2,
                cartonFisico: [
                    [3, 15, 8, 10, 9],
                    [16, 20, 17, 29, 28],
                    [33, 31, 0, 45, 41],
                    [56, 59, 48, 60, 46],
                    [72, 75, 69, 67, 65],
                ],
                cartonLogico: [
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                ],
            },
        ];

        const cartonezGanadoresVertical = verificarGanador(cartonesSorteo);
        expect(cartonezGanadoresVertical.length).toBe(1);
    });
    test('Carton con linea vertical y carton con linea horizontal', () => {
        const cartonesSorteo = [
            {
                id: 1,
                cartonFisico: [
                    [3, 8, 15, 10, 9],
                    [16, 20, 17, 29, 28],
                    [33, 31, 0, 45, 41],
                    [56, 59, 48, 60, 46],
                    [72, 75, 69, 67, 65],
                ],
                cartonLogico: [
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                    [true, null, null, null, null],
                ],
            },
            {
                id: 2,
                cartonFisico: [
                    [3, 15, 8, 10, 9],
                    [16, 20, 17, 29, 28],
                    [33, 31, 0, 45, 41],
                    [56, 59, 48, 60, 46],
                    [72, 75, 69, 67, 65],
                ],
                cartonLogico: [
                    [true, true, true, true, true],
                    [null, null, null, null, null],
                    [null, true, true, true, null],
                    [null, null, null, null, null],
                    [true, null, null, null, null],
                ],
            },
        ];

        const cartonesGanadores = verificarGanador(cartonesSorteo);
        expect(cartonesGanadores.length).toBe(2);
    });
    test('Carton lleno', () => {
        const cartonesSorteo = [
            {
                id: 1,
                cartonFisico: [
                    [3, 8, 15, 10, 9],
                    [16, 20, 17, 29, 28],
                    [33, 31, 0, 45, 41],
                    [56, 59, 48, 60, 46],
                    [72, 75, 69, 67, 65],
                ],
                cartonLogico: [
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                    [true, true, true, true, true],
                ],
            },
        ];

        const cartonesGanadores = verificarGanador(cartonesSorteo);
        // carton horizontal
        // carton vertical
        // carton lleno
        expect(cartonesGanadores.length).toBe(3);
    });
});
