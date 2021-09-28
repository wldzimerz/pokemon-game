import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import PokemonCard from "./../../../../Pokemon Card/PokemonCard";
import Layout from "./../../../../Layout/Layout";

import { FireBaseContext } from "../../../../../context/firebaseContext";
import { PokemonContext } from "../../../../../context/pokemonContext";
import s from "./StartPage.module.css";

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    firebase.getPokemonSoket((pokemons) => {
      setPokemons(pokemons);
    });

    return () => firebase.offPokemonSoket();
  }, [firebase]);

  const handleOpenCard = (key) => {
    const pokemon = { ...pokemons[key] };
    pokemonsContext.onSelectedPokemons(key, pokemon);

    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handleStartGameClick = () => {
    history.push("/game/board");
  };

  return (
    <>
      <Layout title="Cards" colorBg="#e2e2e2">
        <div className={s.add}>
          <button onClick={handleStartGameClick} disabled={Object.keys(pokemonsContext.pokemons).length < 5}>
            Start Game
          </button>
        </div>

        <div className={s.flex}>
          {Object.entries(pokemons).map(([key, { name, img, id, type, values, selected }]) => (
            <PokemonCard
              className={s.card}
              key={key}
              name={name}
              img={img}
              id={id}
              type={type}
              values={values}
              isActive={true}
              isSelected={selected}
              onClickCard={() => {
                if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
                  handleOpenCard(key);
                }
              }}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default StartPage;
