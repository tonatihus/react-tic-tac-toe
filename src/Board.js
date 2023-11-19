import React from "react"
import Cell from "./Cell";
import { AppContext } from "./App";

export const BoardContext = React.createContext();

const Board = ({setMessage, setGameOn}) => {

    const {toggleTurn, gameOn} = React.useContext(AppContext);
    const [newGame, setNewGame] = React.useState(true);

    const a = React.useRef();
    const b = React.useRef();
    const c = React.useRef();
    const d = React.useRef();
    const e = React.useRef();
    const f = React.useRef();
    const g = React.useRef();
    const h = React.useRef();
    const i = React.useRef();

    // Para comprobar que alguno de los jugadores ha ganado, se comprueban las adyacencias definidas en el sig. obj.:
    const adyacencias = {
        a: [[b, c], [d, g], [e, i]],
        b: [[a, c], [e, h]],
        c: [[b, a], [e, g], [f, i]],
        d: [[a, g], [e, f]],
        e: [[a, i], [c, g], [b, h], [d, f]],
        f: [[c, i], [d, e]],
        g: [[a, d], [h, i], [e, c]],
        h: [[g, i], [e, b]],
        i: [[a, e], [g, h], [c, f]],
    }

    // Recibe una referencia de la celda en la que se dió clic y verifica si hay una combinación ganadora con
    // las celdas adyacentes
    const verificaGanador = (symbolOnTurn, ref) => {
        if(newGame) setNewGame(false);

        adyacencias[ref.current.id].forEach((ady) => {
            if( (ady[0].current.innerHTML === symbolOnTurn) && (ady[1].current.innerHTML === symbolOnTurn)) {
                setMessage(`¡Tenemos un ganador (${symbolOnTurn})!`);
                setGameOn(false);
                return;
            }
        });

    };

    function limpiaTablero(){
        a.current.innerHTML = '';
        b.current.innerHTML = '';
        c.current.innerHTML = '';
        d.current.innerHTML = '';
        e.current.innerHTML = '';
        f.current.innerHTML = '';
        g.current.innerHTML = '';
        h.current.innerHTML = '';
        i.current.innerHTML = '';
    }
    
    const jugarNuevamente = () => {
        toggleTurn();
        limpiaTablero();
        setGameOn(true);
        setNewGame(true);
    }

    return (
        <BoardContext.Provider value={{verificaGanador, newGame}}>
            <div className="board">
                <Cell ref={a} id='a' />
                <Cell ref={b} id='b' />
                <Cell ref={c} id='c' />
                <Cell ref={d} id='d' />
                <Cell ref={e} id='e' />
                <Cell ref={f} id='f' />
                <Cell ref={g} id='g' />
                <Cell ref={h} id='h' />
                <Cell ref={i} id='i' />
                <div className="rejugar"> {!gameOn && <button onClick={jugarNuevamente}>Jugar de nuevo</button>}</div>
            </div>
        </BoardContext.Provider>
    );
}

export default Board;