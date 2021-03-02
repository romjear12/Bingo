import React, { useEffect, useState } from 'react';
import './App.css';
import Sorteo from './Sorteo';

import { generarCartonAleatorio, validarCartonManualLleno } from './boards';
import Board from './boards/components/Board';
import BoardDynamic from './boards/components/BoardDynamic';

function App() {
    const [carton, setCarton] = useState(null);
    const [mode, setMode] = useState(null);
    const [sorteo, setSorteo] = useState(false);

    useEffect(() => {
        crearCartonAleatorio();
    }, []);

    const crearCartonAleatorio = () => {
        const cartonGenerado = generarCartonAleatorio();
        setCarton(cartonGenerado);
    };

    const seleccionarCarton = () => {
        const cartonEsValido = validarCartonManualLleno(carton);
        if (cartonEsValido) {
            setSorteo(true);
        } else {
            alert('Complete el cartón correctamente');
        }
    };

    const iniciarSorteo = () => {
        setSorteo(true);
    };

    if (sorteo) return <Sorteo carton={carton} />;
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
            <div className="App-body">
                {!mode ? (
                    <div>
                        <button className="btn btn-success" onClick={() => setMode('random')}>
                            Cartón aleatorio
                        </button>
                        &nbsp;
                        <button className="btn btn-info" onClick={() => setMode('manual')}>
                            Cartón manual
                        </button>
                    </div>
                ) : null}
                {mode && mode === 'random' ? (
                    <div>
                        <Board carton={carton} />
                        <div style={{ marginTop: 15 }}>
                            <button
                                className="btn btn-small btn-primary"
                                onClick={crearCartonAleatorio}
                            >
                                Generar otro cartón
                            </button>
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <button className="btn btn-success" onClick={iniciarSorteo}>
                                Comenzar a jugar
                            </button>
                        </div>
                    </div>
                ) : null}
                {mode && mode === 'manual' ? (
                    <div>
                        <BoardDynamic carton={carton} setCarton={setCarton} />
                        <button className="btn btn-success" onClick={seleccionarCarton}>
                            Comenzar a jugar
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;
