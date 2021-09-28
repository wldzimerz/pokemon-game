import { useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { PokemonContext } from "../../../context/pokemonContext";
import BoardPage from "./routes/Board/BoardPage";
import FinishPage from "./routes/Finish/FinishPage";
import StartPage from "./routes/Start/StartPage";

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
  const [selectedPokemons2, setSelectedPokemons2] = useState([]);
  const [winner, setWinner] = useState([]);
  const match = useRouteMatch();

  const handleSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];

        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };

  const cleanContext = () => {
    setSelectedPokemons({});
    setSelectedPokemons2([]);
  };

  const gameOver = () => {
    if (Object.keys(selectedPokemons).length === 5 && Object.keys(selectedPokemons2).length === 5) {
      return true;
    } else {
      return false;
    }
  };

  const getPlayer2Cards = (player2) => {
    return setSelectedPokemons2((prevState) => (prevState = [...player2]));
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemons,
        pokemons2: selectedPokemons2,
        getPlayer2Cards,
        cleanContext,
        onSelectedPokemons: handleSelectedPokemons,
        gameOver,
        winner,
        setWinner,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} render={() => (gameOver() ? <FinishPage /> : <Redirect to={`${match.path}/`} />)} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
