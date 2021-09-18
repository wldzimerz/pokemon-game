import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import PokemonCard from "./../../Pokemon Card/PokemonCard";
import Layout from "../../Layout/Layout";

import database from "../../../services/firebase";
import s from "./GamePage.module.css";

const GamePage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  const [poks, setPokemonState] = useState({});

  useEffect(() => {
    database.ref("pokemons").once("value", (snapshot) => {
      setPokemonState(snapshot.val());
    });
  }, [poks]);

  const handleOpenCard = (id, isActive, objID) => {
    setPokemonState((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          pokemon.active = !pokemon.active; // !pokemon.active or true
        }

        acc[item[0]] = pokemon;

        return acc;
      }, {});
    });

    database.ref("pokemons/" + objID).set({
      ...poks[objID],
      active: !isActive,
    });
  };

  const handleAddPokemon = () => {
    const randomCard = Math.floor(Math.random() * (4 - 0) + 0);
    console.log(randomCard);
    const newKey = database.ref().child("pokemons").push().key;
    database.ref("pokemons/" + newKey).set(Object.values(poks)[randomCard]);
  };

  return (
    <>
      <button onClick={handleClick}>Home</button>
      <Layout title="Cards" colorBg="#e2e2e2">
        <div className={s.add}>
          <button onClick={handleAddPokemon}>Add new pokemon</button>
        </div>

        <div className={s.flex}>
          {Object.entries(poks).map(([key, { name, img, id, type, values, active }]) => (
            <PokemonCard
              key={key}
              objID={key}
              name={name}
              img={img}
              id={id}
              type={type}
              values={values}
              isActive={active}
              onClickCard={handleOpenCard}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;
