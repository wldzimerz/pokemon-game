import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PokemonCard from "./../../../../Pokemon Card/PokemonCard";
import PlayerBoard from "./component/PlayerBoard";

import { selectedPokemons } from "../../../../../store/pokemons";
import { getPokemons2Async, selectedPokemons2 } from "../../../../../store/pokemons2";
import { setWinner } from "../../../../../store/gameResult";

import s from "./BoardPage.module.css";

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach((item) => {
    if (item.card.possession === "red") {
      player2Count++;
    }
    if (item.card.possession === "blue") {
      player1Count++;
    }
  });
  return [player1Count, player2Count];
};

const BoardPage = () => {
  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const selectedPokemons2Redux = useSelector(selectedPokemons2);

  const [board, setBoard] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [choiseCard, setChoiseCard] = useState(null);
  const [steps, setSteps] = useState(0);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(selectedPokemonsRedux).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");
      const boardRequest = await boardResponse.json();
      setBoard(boardRequest.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedPokemons2Redux.length) {
      dispatch(getPokemons2Async());
    }

    setPlayer2(() => {
      return selectedPokemons2Redux.map((item) => ({
        // ?.map
        ...item,
        possession: "red",
      }));
    });
  }, [selectedPokemons2Redux, dispatch]);

  if (Object.keys(selectedPokemonsRedux).length === 0) {
    history.replace("/game");
  }

  const handleClickBoardPlate = async (position) => {
    if (choiseCard) {
      const params = {
        position,
        card: choiseCard,
        board,
      };
      const res = await fetch("https://reactmarathon-api.netlify.app/api/players-turn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const request = await res.json();

      if (choiseCard.player === 1) {
        setPlayer1((prevState) => prevState.filter((item) => item.id !== choiseCard.id));
      }
      if (choiseCard.player === 2) {
        setPlayer2((prevState) => prevState.filter((item) => item.id !== choiseCard.id));
      }

      setBoard(request.data);
      setSteps((prevState) => {
        const count = prevState + 1;
        return count;
      });
    }
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        alert("WIN");
        dispatch(setWinner("player1"));
      } else if (count1 < count2) {
        alert("LOSE");
        dispatch(setWinner("player2"));
      } else {
        alert("DRAW");
        dispatch(setWinner());
      }
      history.replace("/game/finish");
    }
  }, [steps, board, player1, player2, dispatch, history]);

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard player={1} cards={player1} onClickCard={(card) => setChoiseCard(card)} />
      </div>
      <div className={s.board}>
        {board.map((item) => (
          <div key={item.position} className={s.boardPlate} onClick={() => handleClickBoardPlate(item.position)}>
            {item.card && <PokemonCard {...item.card} isActive minimize />}
          </div>
        ))}
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard player={2} cards={player2} onClickCard={(card) => setChoiseCard(card)} />
      </div>
    </div>
  );
};

export default BoardPage;
