import React, { useEffect, useState, useReducer } from 'react';
import './App.css';

import {
    generarCartonesSorteo,
    generarNumeroRandom,
    marcarNumeroCarton,
    verificarGanador,
} from './game';
import Board from './boards/components/Board';

function Sorteo(props) {
    const { carton } = props;
    let interval = null;
    const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
        timer: null,
        cartonesSorteo: generarCartonesSorteo([carton]),
        ganadores: [],
        numerosCantados: [],
    });

    useEffect(() => {
        comenzarJuego();
    }, []);

    const comenzarJuego = () => {
        state.timer = setInterval(cantarNumero, 1000);
    };

    const cantarNumero = () => {
        const numero = generarNumeroRandom(state.numerosCantados);
        state.numerosCantados.push(numero);
        setState({ ...state, numerosCantados: state.numerosCantados });

        state.cartonesSorteo.forEach(carton => {
            marcarNumeroCarton(numero, carton);
        });

        const cartonesGanadores = verificarGanador(state.cartonesSorteo);
        if (cartonesGanadores.length !== state.ganadores) {
            setState({ ...state, ganadores: cartonesGanadores });
        }
        const ganadorCartonLleno = cartonesGanadores.find(
            ganador => ganador.mode === 'Carton lleno',
        );

        if (state.numerosCantados.length === 75 || ganadorCartonLleno) {
            clearInterval(state.timer);
        }
    };

    const ganadorCartonLleno = state.ganadores.find(ganador => ganador.mode === 'Carton lleno');

    return (
        <div className="App">
            <div>
                <h1
                    onClick={() => window.location.replace('/')}
                    style={{ margin: 0, padding: '20px 0', color: 'white' }}
                >
                    Bingo DEMO
                </h1>
            </div>
            <div className="App-sorteo">
                <div className="App-body">
                    {state.cartonesSorteo.map((carton, index) => (
                        <div key={index}>
                            <Board
                                carton={carton.cartonFisico}
                                cartonLogico={carton.cartonLogico}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ margin: 20 }}>
                    Numeros cantados
                    <div style={{ marginTop: 20 }}>
                        {state.numerosCantados.map(numero => `${numero}, `)}
                    </div>
                    {ganadorCartonLleno ? <h1>Juego finalizado</h1> : null}
                </div>
                {state.ganadores.length > 0 ? (
                    <div>
                        Ganador
                        <div style={{ marginTop: 20 }}>
                            {state.ganadores.map(ganador => (
                                <p>{ganador.mode}</p>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Sorteo;
