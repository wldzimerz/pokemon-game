import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FirebaseClass from "./../../../../../services/firebase";

import { winner as storeWinner } from "../../../../../store/gameResult";
import { clearPokemons, selectedPokemons } from "../../../../../store/pokemons";
import { clearPokemons2, selectedPokemons2 } from "../../../../../store/pokemons2";
import PokemonCard from "../../../../Pokemon Card/PokemonCard";

import s from "./FinishPage.module.css";
import { selectLocalId } from "./../../../../../store/user";
import { NotificationManager } from "react-notifications";

const FinishPage = () => {
  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const selectedPokemons2Redux = useSelector(selectedPokemons2);
  const winner = useSelector(storeWinner);
  const localId = useSelector(selectLocalId);

  const [wonPokemon, setWonPokemon] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleEndGame = () => {
    if (Object.keys(wonPokemon).length !== 0) {
      FirebaseClass.addPokemon(wonPokemon, localId);
      setWonPokemon({});
      dispatch(clearPokemons());
      dispatch(clearPokemons2());
      history.push("/game");
    } else {
      NotificationManager.error("Choose your opponent's pokemon!");
    }
  };

  const addWonPokemon = (item) => {
    return setWonPokemon({ ...item });
  };

  return (
    <>
      <div className={s.flex}>
        {Object.values(selectedPokemonsRedux).map((item) => {
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
        <button
          onClick={() => {
            if (winner === "player1") {
              handleEndGame();
            } else {
              history.push("/game");
              setWonPokemon({});
              dispatch(clearPokemons());
              dispatch(clearPokemons2());
            }
          }}
        >
          END GAME
        </button>
      </div>
      <div className={s.flex}>
        {Object.values(selectedPokemons2Redux).map((item) => {
          return (
            <PokemonCard
              className={s.card}
              name={item.name}
              type={item.type}
              values={item.values}
              possession={item.possession}
              img={item.img}
              // isSelected={isSelected}
              id={item.id}
              isActive
              onClickCard={() => {
                if (winner === "player1") {
                  addWonPokemon(item);
                  // setSelected((prevState) => !prevState);
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
