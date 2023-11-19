import React from "react";
import App, { AppContext } from "./App";
import { BoardContext } from "./Board";

const Cell = ({...delegated}, ref) => {

    const {symbolOnTurn, toggleTurn, displayError, gameOn} = React.useContext(AppContext);
    const {verificaGanador, newGame} = React.useContext(BoardContext);
    const [cellContent, setCellContent] = React.useState('');

    const handleClick = () => {
        if(!gameOn) return;

        if(cellContent !== ''){
            displayError('That cell is already used, try an empty cell');
            return;
        }

        setCellContent(symbolOnTurn);
        toggleTurn();
        displayError('');
        verificaGanador(symbolOnTurn, ref);
    }

    React.useEffect(() => {
        if(newGame){
            setCellContent('');
        }
    },[newGame])

    return (
        <div 
            ref={ref}
            className="cell"
            onClick={handleClick}
            {...delegated}
        >
            {cellContent}
        </div>
    );
}

export default React.memo(React.forwardRef(Cell));