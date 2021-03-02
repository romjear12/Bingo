import React, { useState, useEffect } from 'react';
import { validarNumeroIngresado } from '../index';

const cartonDefault = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, 0, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
];

const cartonLogico = [
    [
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
    ],
    [
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
    ],
    [
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
    ],
    [
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
    ],
    [
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
        { value: null, valid: false, edit: false },
    ],
];
function BoardDynamic(props) {
    const { carton, setCarton } = props;
    const [cartonInputs, setCartonInputs] = useState(cartonLogico);

    useEffect(() => {
        setCarton(cartonDefault);
    });

    const handleInputChange = (nroColumna, valor, posicionColumna) => {
        var newCartonInputs = [...cartonInputs];
        newCartonInputs[nroColumna][posicionColumna].value = Number(valor);
        setCartonInputs(newCartonInputs);
    };

    const handleKeyPressSlot = (e, cartonLogico, nroColumna, posicionColumna) => {
        if (e.key === 'Enter') {
            const valor = Number(e.target.value);
            const isValid = validarNumeroIngresado(carton, nroColumna, valor, posicionColumna);
            if (isValid.ok) {
                const newCarton = [...carton];
                newCarton[nroColumna][posicionColumna] = valor;
                setCarton(newCarton);

                const newCartonLogico = [...cartonLogico];
                newCartonLogico[nroColumna][posicionColumna].valid = true;
                newCartonLogico[nroColumna][posicionColumna].edit = false;
                setCartonInputs(newCartonLogico);

                setFocusNextInput(nroColumna, posicionColumna);
            } else {
                const newCartonLogico = [...cartonLogico];
                newCartonLogico[nroColumna][posicionColumna].valid = false;
                setCartonInputs(newCartonLogico);
            }
        }
    };

    const handleBlur = (e, cartonLogico, nroColumna, posicionColumna) => {
        const valor = Number(e.target.value);
        const isValid = validarNumeroIngresado(carton, nroColumna, valor, posicionColumna);
        if (isValid.ok) {
            const newCarton = [...carton];
            newCarton[nroColumna][posicionColumna] = valor;
            setCarton(newCarton);

            const newCartonLogico = [...cartonLogico];
            newCartonLogico[nroColumna][posicionColumna].valid = true;
            newCartonLogico[nroColumna][posicionColumna].edit = false;
            setCartonInputs(newCartonLogico);
        } else {
            const newCartonLogico = [...cartonLogico];
            newCartonLogico[nroColumna][posicionColumna].valid = false;
            setCartonInputs(newCartonLogico);
        }
    };

    const setFocusNextInput = (nroColumna, posicionColumna) => {
        if (nroColumna === 2 && posicionColumna === 1) {
            document.getElementsByName(`ref-2-3`)[0].focus();
        } else if (posicionColumna < 4) {
            document.getElementsByName(`ref-${nroColumna}-${posicionColumna + 1}`)[0].focus();
        } else if (posicionColumna === 4 && nroColumna < 4) {
            document.getElementsByName(`ref-${nroColumna + 1}-0`)[0].focus();
        }
    };

    const handleEditSlot = (nroColumna, posicionColumna) => {
        const newCartonLogico = [...cartonLogico];
        newCartonLogico[nroColumna][posicionColumna].edit = true;
        setCartonInputs(newCartonLogico);
    };

    const renderizarColumna = (nroColumna, columna) => {
        if (nroColumna === 0 || nroColumna === 1 || nroColumna === 3 || nroColumna === 4) {
            return columna.map((col, index) => (
                <div
                    className={`board-slot-body ${
                        cartonInputs[nroColumna][index].value &&
                        !cartonInputs[nroColumna][index].valid
                            ? 'board-slot-error'
                            : ''
                    }`}
                    key={`slot-${nroColumna}-${index}`}
                >
                    {col &&
                    cartonInputs[nroColumna][index].valid &&
                    !cartonInputs[nroColumna][index].edit ? (
                        <p onClick={() => handleEditSlot(nroColumna, index)}>{col}</p>
                    ) : (
                        <input
                            inputMode="numeric"
                            onChange={e => handleInputChange(nroColumna, e.target.value, index)}
                            onKeyPress={e => handleKeyPressSlot(e, cartonInputs, nroColumna, index)}
                            onBlur={e => handleBlur(e, cartonInputs, nroColumna, index)}
                            value={cartonInputs[nroColumna][index].value || ''}
                            type="text"
                            maxLength="2"
                            className="board-input"
                            name={`ref-${nroColumna}-${index}`}
                        />
                    )}
                </div>
            ));
        } else {
            return columna.map((col, index) => {
                if (index !== 2) {
                    return (
                        <div
                            className={`board-slot-body ${
                                cartonInputs[nroColumna][index].value &&
                                !cartonInputs[nroColumna][index].valid
                                    ? 'board-slot-error'
                                    : ''
                            }`}
                            key={`slot-${nroColumna}-${index}`}
                        >
                            {col &&
                            cartonInputs[nroColumna][index].valid &&
                            !cartonInputs[nroColumna][index].edit ? (
                                <p>{col}</p>
                            ) : (
                                <input
                                    inputMode="numeric"
                                    onChange={e =>
                                        handleInputChange(nroColumna, e.target.value, index)
                                    }
                                    onKeyPress={e =>
                                        handleKeyPressSlot(e, cartonInputs, nroColumna, index)
                                    }
                                    onBlur={e => handleBlur(e, cartonInputs, nroColumna, index)}
                                    value={cartonInputs[nroColumna][index].value || ''}
                                    type="text"
                                    maxLength="2"
                                    className="board-input"
                                    name={`ref-${nroColumna}-${index}`}
                                />
                            )}
                        </div>
                    );
                } else {
                    return (
                        <div className="board-slot-body" key={`slot-${nroColumna}-${index}`}>
                            <p>*</p>
                        </div>
                    );
                }
            });
        }
    };

    if (!carton) return null;

    const columnaB = renderizarColumna(0, carton[0]);
    const columnaI = renderizarColumna(1, carton[1]);
    const columnaN = renderizarColumna(2, carton[2]);
    const columnaG = renderizarColumna(3, carton[3]);
    const columnaO = renderizarColumna(4, carton[4]);

    return (
        <div className="board">
            <div className="board-header">
                <div className="board-header">
                    <div className="board-slot-header">
                        <p>B</p>
                    </div>
                </div>
                <div className="board-header">
                    <div className="board-slot-header">
                        <p>I</p>
                    </div>
                </div>
                <div className="board-header">
                    <div className="board-slot-header">
                        <p>N</p>
                    </div>
                </div>
                <div className="board-header">
                    <div className="board-slot-header">
                        <p>G</p>
                    </div>
                </div>
                <div className="board-header">
                    <div className="board-slot-header">
                        <p>O</p>
                    </div>
                </div>
            </div>
            <div className="board-body">
                <div className="board-col">{columnaB}</div>
                <div className="board-col">{columnaI}</div>
                <div className="board-col">{columnaN}</div>
                <div className="board-col">{columnaG}</div>
                <div className="board-col">{columnaO}</div>
            </div>
        </div>
    );
}

export default BoardDynamic;
