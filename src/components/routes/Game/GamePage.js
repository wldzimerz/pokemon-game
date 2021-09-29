import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import BoardPage from "./routes/Board/BoardPage";
import FinishPage from "./routes/Finish/FinishPage";
import StartPage from "./routes/Start/StartPage";

import { selectedPokemons } from "../../../store/pokemons";
import { selectedPokemons2 } from "../../../store/pokemons2";

const GamePage = () => {
  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const selectedPokemons2Redux = useSelector(selectedPokemons2);
  const match = useRouteMatch();

  const gameOver = Object.keys(selectedPokemonsRedux).length === 5 && Object.keys(selectedPokemons2Redux).length === 5;

  return (
    <Switch>
      <Route path={`${match.path}/`} exact component={StartPage} />
      <Route path={`${match.path}/board`} component={BoardPage} />
      <Route path={`${match.path}/finish`} render={() => (gameOver ? <FinishPage /> : <Redirect to={`${match.path}/`} />)} />
    </Switch>
  );
};

export default GamePage;
