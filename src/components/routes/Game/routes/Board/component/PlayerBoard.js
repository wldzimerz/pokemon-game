// import { useState } from "react";

import PokemonCard from "../../../../../Pokemon Card/PokemonCard";
import classNames from "classnames";

import s from "./PlayerBoard.module.css";

const PlayerBoard = ({ player, cards, onClickCard, turnPlayer }) => {
  // const [isSelected, setSelected] = useState(null);

  return (
    <>
      {cards &&
        cards.map((item) => (
          <div
            key={item.id}
            className={classNames(s.cardBoard, {
              [s.selected]: item.selected,
            })}
            onClick={() => {
              if (turnPlayer === player) {
                item.selected = true;
                onClickCard && onClickCard({ player, ...item });
              }
            }}
          >
            <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              isActive={true}
              isSelected={item.selected}
              minimize
            />
          </div>
        ))}
    </>
  );
};

export default PlayerBoard;
