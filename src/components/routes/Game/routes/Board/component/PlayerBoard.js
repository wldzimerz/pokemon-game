import PokemonCard from "../../../../../Pokemon Card/PokemonCard";
import { useState } from "react";
import classNames from "classnames";

import s from "./PlayerBoard.module.css";

const PlayerBoard = ({ player, cards, onClickCard }) => {
  const [isSelected, setSelected] = useState(null);

  return (
    <>
      {cards.map((item) => (
        <div
          className={classNames(s.cardBoard, {
            [s.selected]: isSelected === item.id,
          })}
          onClick={() => {
            setSelected(item.id);
            onClickCard && onClickCard({ player, ...item });
          }}
        >
          <PokemonCard key={item.id} name={item.name} img={item.img} id={item.id} type={item.type} values={item.values} minimize isActive />
        </div>
      ))}
    </>
  );
};

export default PlayerBoard;
