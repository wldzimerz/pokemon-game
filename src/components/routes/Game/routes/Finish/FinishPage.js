import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FireBaseContext } from "../../../../../context/firebaseContext";

import { PokemonContext } from "../../../../../context/pokemonContext";
import PokemonCard from "../../../../Pokemon Card/PokemonCard";

import s from "./FinishPage.module.css";

const FinishPage = () => {
  const pokemonsContext = useContext(PokemonContext);
  // const { pokemons, pokemons2, cleanContext, winner } = useContext(PokemonContext);
  const firebase = useContext(FireBaseContext);
  const [wonPokemon, setWonPokemon] = useState({});
  const history = useHistory();

  const handleEndGame = () => {
    history.push("/game");
    firebase.addPokemon(wonPokemon);
    setWonPokemon({});
    pokemonsContext.cleanContext();
  };

  const addWonPokemon = (item) => {
    item.isSelected = !item.isSelected;
    return setWonPokemon({ ...item });
  };

  return (
    <>
      <div className={s.flex}>
        {Object.values(pokemonsContext.pokemons).map((item) => {
          return (
            <PokemonCard
              className={s.card}
              name={item.name}
              type={item.type}
              values={item.values}
              possession={item.possession}
              img={item.img}
              id={item.id}
              isActive
            />
          );
        })}
      </div>
      <div className={s.button}>
        <button onClick={handleEndGame}>END GAME</button>
      </div>
      <div className={s.flex}>
        {Object.values(pokemonsContext.pokemons2).map((item) => {
          return (
            <PokemonCard
              className={s.card}
              name={item.name}
              type={item.type}
              values={item.values}
              possession={item.possession}
              img={item.img}
              isSelected={item.selected}
              id={item.id}
              isActive
              onClickCard={() => {
                if (pokemonsContext.winner === "player1") {
                  addWonPokemon(item);
                  console.log(item.isSelected);
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default FinishPage;
