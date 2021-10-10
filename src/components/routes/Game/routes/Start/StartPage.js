import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PokemonCard from "./../../../../Pokemon Card/PokemonCard";
import Layout from "./../../../../Layout/Layout";

import { getPokemonsAsync, selectPokemonsData, selectPokemonsLoading, selectedPokemons, handleSelectedPokemons } from "../../../../../store/pokemons";

import s from "./StartPage.module.css";

const StartPage = () => {
  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemonsRedux = useSelector(selectedPokemons);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, [pokemonsRedux, dispatch]);

  const handleSelectCard = (key, pokemon) => {
    dispatch(handleSelectedPokemons({ key, pokemon }));
  };

  const handleStartGameClick = () => {
    history.push("/game/board");
  };

  return (
    <>
      <Layout title="Cards" colorBg="#e2e2e2">
        <div className={s.add}>
          <p>Choose 5 cards!</p>
          <button onClick={handleStartGameClick} disabled={Object.keys(selectedPokemonsRedux).length < 5}>
            Start Game!
          </button>
        </div>

        <div className={s.flex}>
          {Object.entries(pokemonsRedux).map(([key, pokemon]) => {
            const { name, img, id, type, values, selected } = pokemon;
            return (
              <PokemonCard
                isSelected={Boolean(selectedPokemonsRedux[key])}
                className={s.card}
                key={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                isActive={true}
                onClickCard={() => {
                  if (Object.keys(selectedPokemonsRedux).length < 5 || selected) {
                    handleSelectCard(key, pokemon);
                  }
                }}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default StartPage;
