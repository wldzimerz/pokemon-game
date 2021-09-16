import { useState } from "react";
import { useHistory } from "react-router-dom";
import s from "./GamePage.module.css";

import POKEMONS from "../../../data/pokemons.json";
import PokemonCard from "./../../Pokemon Card/PokemonCard";
import Layout from "../../Layout/Layout";

const GamePage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  const [poks, setPokemonState] = useState([...POKEMONS]);
  const handleOpenCard = (id) => {
    setPokemonState(
      poks.map((item) => {
        if (item.id === id) {
          item.active = !item.active;
        }
        return item;
      })
    );
  };
  return (
    <>
      <div>This is Game Page!</div>
      <button onClick={handleClick}>Home</button>
      <Layout title="Cards" colorBg="#e2e2e2">
        <div className={s.flex}>
          {POKEMONS.map((item) => (
            <PokemonCard
              key={item.id}
              name={item.name}
              type={item.type}
              img={item.img}
              values={item.values}
              id={item.id}
              isActive={item.active}
              onClickCard={handleOpenCard}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;
