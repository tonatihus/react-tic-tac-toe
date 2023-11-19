import React from 'react';
import './App.css';
import Board from './Board';

export const AppContext = React.createContext();

function App() {

  const [symbolOnTurn, setSymbolOnTurn] = React.useState('X');
  const [message, setMessage] = React.useState("Player 1's Turn: (X) ");
  const [errorMsg, setErrorMsg] = React.useState('');
  const [gameOn, setGameOn] = React.useState(true);

  const toggleTurn = () => {
    if(symbolOnTurn === 'X') {
      setSymbolOnTurn('O');
      setMessage("Player 2's Turn: (O)");
    } 
    else {
      setSymbolOnTurn('X');
      setMessage("Player 1's Turn: (X) ");
    }
  };

  const displayError = React.useCallback((msg) => {
    setErrorMsg(msg);
  }, []);
  

  return (
    <AppContext.Provider value={{symbolOnTurn, toggleTurn, displayError, gameOn}}>
      <div className="App">
        <div className='messages'>{message}</div>
        <Board setMessage={setMessage} setGameOn={setGameOn} />
        <div className='errorMsgs'>{errorMsg}</div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
