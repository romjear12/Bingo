import React from 'react';

function Board(props) {
    const { carton, cartonLogico } = props;
    const renderizarColumna = (nroColumna, columna) => {
        if (nroColumna === 0 || nroColumna === 1 || nroColumna === 3 || nroColumna === 4) {
            return columna.map((col, index) => {
                const slotMarked =
                    cartonLogico && cartonLogico[nroColumna][index] ? 'board-slot-body-mark' : '';
                return (
                    <div
                        className={`board-slot-body ${slotMarked}`}
                        key={`slot-${nroColumna}-${index}`}
                    >
                        <p>{col}</p>
                    </div>
                );
            });
        } else {
            return columna.map((col, index) => {
                const slotMarked =
                    cartonLogico && cartonLogico[nroColumna][index] ? 'board-slot-body-mark' : '';
                if (index !== 2) {
                    return (
                        <div
                            className={`board-slot-body ${slotMarked}`}
                            key={`slot-${nroColumna}-${index}`}
                        >
                            <p>{col}</p>
                        </div>
                    );
                } else {
                    return (
                        <div
                            className={`board-slot-body ${slotMarked}`}
                            key={`slot-${nroColumna}-${index}`}
                        >
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

export default Board;
