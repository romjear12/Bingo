import {
    generarCartonAleatorio,
    numerosRepetidosColumna,
    validarNumeroIngresado,
    validarCartonManualLleno,
} from './index';
import BoardDynamic from './components/BoardDynamic';
import { render, screen } from '@testing-library/react';

describe('Función que detecta cartones con números repetidos', () => {
    test('Cartón correcto', () => {
        const cartonCorrecto = [
            [3, 8, 15, 10, 9],
            [16, 20, 17, 29, 28],
            [33, 31, 0, 45, 41],
            [56, 59, 48, 60, 46],
            [72, 75, 69, 67, 65],
        ];
        expect(numerosRepetidosColumna(cartonCorrecto[0])).toBeFalsy();
        expect(numerosRepetidosColumna(cartonCorrecto[1])).toBeFalsy();
        expect(numerosRepetidosColumna(cartonCorrecto[2])).toBeFalsy();
        expect(numerosRepetidosColumna(cartonCorrecto[3])).toBeFalsy();
        expect(numerosRepetidosColumna(cartonCorrecto[4])).toBeFalsy();
    });

    test('Cartón incorrecto', () => {
        const cartonIncorrecto = [
            [3, 8, 3, 10, 9],
            [16, 20, 17, 29, 28],
            [33, 31, 0, 45, 41],
            [56, 59, 48, 60, 46],
            [72, 75, 69, 67, 65],
        ];
        expect(numerosRepetidosColumna(cartonIncorrecto[0])).toBeTruthy();
        expect(numerosRepetidosColumna(cartonIncorrecto[1])).toBeFalsy();
        expect(numerosRepetidosColumna(cartonIncorrecto[2])).toBeFalsy();
        expect(numerosRepetidosColumna(cartonIncorrecto[3])).toBeFalsy();
        expect(numerosRepetidosColumna(cartonIncorrecto[4])).toBeFalsy();
    });
});

describe('Carton aleatorio generado correctamente', () => {
    const cartonGenerado = generarCartonAleatorio();
    // Las columnas del cartón están representadas por cada posición del arreglo superior
    // Un cartón de 75 números es de 5x5 posiciones
    test('Las columnas del cartón = 5', () => {
        expect(cartonGenerado.length).toBe(5);
    });

    test('Las filas de cada columna = 5', () => {
        expect(cartonGenerado[0].length).toBe(5);
        expect(cartonGenerado[1].length).toBe(5);
        expect(cartonGenerado[2].length).toBe(5);
        expect(cartonGenerado[3].length).toBe(5);
        expect(cartonGenerado[4].length).toBe(5);
    });

    test('El cartón no genera números repetidos', () => {
        expect(numerosRepetidosColumna(cartonGenerado[0])).toBeFalsy();
    });
});

describe('Cartón manual creado correctamente', () => {
    const carton = null;
    const setCarton = jest.fn();

    test('Número inválido porque está fuera del rango permitido', () => {
        const cartonManual = [
            [3, 8, 15, null, null],
            [null, null, null, null, null],
            [null, null, 0, null, null],
            [null, null, null, null, null],
            [58, null, null, null, null],
        ];
        const numeroValido_1 = validarNumeroIngresado(cartonManual, 0, 33, 3);
        expect(numeroValido_1).toEqual({
            ok: false,
            error: 'fuera_rango',
            posicionSeleccionada: 3,
        });
    });

    test('Número inválido porque ya existe en la posición 1', () => {
        const cartonManual = [
            [3, 8, 15, null, null],
            [null, null, null, null, null],
            [null, null, 0, null, null],
            [null, null, null, null, null],
            [72, null, null, null, null],
        ];
        const numeroValido_1 = validarNumeroIngresado(cartonManual, 0, 3, 3);
        expect(numeroValido_1).toEqual({
            ok: false,
            error: 'repetido',
            posicionSeleccionada: 3,
            posicionOcupada: 0,
        });

        const numeroValido_2 = validarNumeroIngresado(cartonManual, 4, 72, 4);
        expect(numeroValido_2).toEqual({
            ok: false,
            error: 'repetido',
            posicionSeleccionada: 4,
            posicionOcupada: 0,
        });
    });

    test('Número válido porque no existe en el cartón', () => {
        const cartonManual = [
            [3, 8, 15, null, null],
            [null, null, null, null, null],
            [null, null, 0, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
        ];

        const numeroValido = validarNumeroIngresado(cartonManual, 0, 12, 3);
        expect(numeroValido).toEqual({ ok: true, posicionSeleccionada: 3 });
    });

    test('Número válido porque está dentro del rango permitido y no está repetido', () => {
        const cartonManual = [
            [3, 8, 15, null, null],
            [null, null, null, null, null],
            [null, null, 0, null, null],
            [null, null, null, null, null],
            [58, null, null, null, null],
        ];

        // Dentro del rango y no repetido
        const numeroValido1 = validarNumeroIngresado(cartonManual, 0, 14, 4);
        expect(numeroValido1).toEqual({ ok: true, posicionSeleccionada: 4 });

        const numeroValid2 = validarNumeroIngresado(cartonManual, 0, 14, 4);
        expect(numeroValid2).toEqual({ ok: true, posicionSeleccionada: 4 });

        const numeroValido3 = validarNumeroIngresado(cartonManual, 1, 23, 4);
        expect(numeroValido3).toEqual({ ok: true, posicionSeleccionada: 4 });

        const numeroValido4 = validarNumeroIngresado(cartonManual, 2, 33, 4);
        expect(numeroValido4).toEqual({ ok: true, posicionSeleccionada: 4 });

        const numeroValido5 = validarNumeroIngresado(cartonManual, 3, 56, 4);
        expect(numeroValido5).toEqual({ ok: true, posicionSeleccionada: 4 });

        const numeroValido6 = validarNumeroIngresado(cartonManual, 4, 72, 4);
        expect(numeroValido6).toEqual({ ok: true, posicionSeleccionada: 4 });
    });

    test('Carton lleno', () => {
        const cartonManual = [
            [3, 8, 15, 12, 10],
            [16, 17, 21, 22, 23],
            [36, 40, 0, 39, 37],
            [57, 57, 58, 59, 60],
            [70, 66, 69, 72, 73],
        ];
        const cartonValido = validarCartonManualLleno(cartonManual);
        expect(cartonValido).toBe(true);
    });
});
