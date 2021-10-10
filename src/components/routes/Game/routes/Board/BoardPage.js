import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PokemonCard from "./../../../../Pokemon Card/PokemonCard";
import PlayerBoard from "./component/PlayerBoard";
import Result from "./component/Result/Result";
import ArrowChoice from "./component/ArrowChoice/ArrowChoice";
import request from "./../../../../../services/request";

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

const returnBoard = (board) => {
  return board.map((item, index) => {
    let card = null;
    if (typeof item === "object") {
      card = {
        ...item.poke,
        possession: item.holder === "p1" ? "blue" : "red",
      };
    }

    return {
      position: index + 1,
      card,
    };
  });
};

const BoardPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedPokemonsRedux = useSelector(selectedPokemons);

  if (Object.keys(selectedPokemonsRedux).length === 0) {
    history.replace("/game");
  }

  const selectedPokemons2Redux = useSelector(selectedPokemons2);

  const [result, setResult] = useState(null);
  const [turn, setTurn] = useState(0);
  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(selectedPokemonsRedux).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });
  const [player2, setPlayer2] = useState([]);
  const [choiseCard, setChoiseCard] = useState(null);
  const [steps, setSteps] = useState(0);
  const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [aiFirstTurn, setAiFirstTurn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const boardRequest = await request.getBoard();
      setBoard(boardRequest.data);

      setPlayer2(() => {
        return selectedPokemons2Redux?.map((item) => ({
          // ?.map
          ...item,
          possession: "red",
        }));
      });
    };

    setTimeout(() => {
      // const side = Math.ceil(Math.random() * 2);
      const side = 1;
      setTurn(side);
      if (side === 2) {
        setAiFirstTurn(true);
        // console.log("aiFirstTurn1: ", aiFirstTurn);
      }
    }, 2000);

    fetchData();
  }, [selectedPokemons2Redux]);

  useEffect(() => {
    if (!selectedPokemons2Redux.length) {
      dispatch(getPokemons2Async());
    }
  }, [selectedPokemons2Redux, dispatch]);

  // const params = {
  //   currentPlayer: "p2",
  //   hands: {
  //     p1: player1,
  //     p2: player2,
  //   },
  //   move: null,
  //   board: serverBoard,
  // };

  // useEffect(
  //   (position) => {
  //     const params = {
  //       currentPlayer: aiFirstTurn ? "p2" : "p1",
  //       hands: {
  //         p1: player1,
  //         p2: player2,
  //       },
  //       move: aiFirstTurn
  //         ? null
  //         : {
  //             poke: {
  //               ...choiseCard,
  //             },
  //             position,
  //           },
  //       board: serverBoard,
  //     };

  //     request.game(params);
  //   },
  //   [aiFirstTurn]
  // );

  const handleClickBoardPlate = async (position) => {
    // console.log("aiFirstTurn click: ", aiFirstTurn);
    if (typeof choiseCard === "object") {
      const params = {
        currentPlayer: aiFirstTurn ? "p2" : "p1",
        hands: {
          p1: player1,
          p2: player2,
        },
        move: aiFirstTurn
          ? null
          : {
              poke: {
                ...choiseCard,
              },
              position,
            },
        board: serverBoard,
      };

      const game = await request.game(params);
      // console.log("game: ", game);

      if (choiseCard.player === 1) {
        setPlayer1((prevState) => prevState.filter((item) => item.id !== choiseCard.id));
      }

      setBoard((prevState) =>
        prevState.map((item) => {
          if (item.position === position) {
            return {
              ...item,
              card: choiseCard,
            };
          }
          return item;
        })
      );

      setBoard(returnBoard(game.oldBoard));

      setSteps((prevState) => prevState + 1);

      if (game.move !== null) {
        const idAi = game.move.poke.id;

        setTimeout(() => {
          setPlayer2((prevState) =>
            prevState.map((item) => {
              if (item.id === idAi) {
                return {
                  ...item,
                  selected: true,
                };
              }

              return item;
            })
          );
        }, 1000);

        setTimeout(() => {
          setPlayer2(() => game.hands.p2.pokes.map((item) => item.poke));
          setServerBoard(game.board);
          setBoard(returnBoard(game.board));
          setSteps((prevState) => prevState + 1);
          setTurn(1);
        }, 2000);
      }
    }
    setTurn(2);
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        setResult("win");
        dispatch(setWinner("player1"));
      } else if (count1 < count2) {
        setResult("lose");
        dispatch(setWinner("player2"));
      } else {
        setResult("draw");
        dispatch(setWinner());
      }

      setTimeout(() => history.replace("/game/finish"), 3000);
    }
  }, [steps, board, player1, player2, dispatch, history]);

  return (
    <div className={s.root}>
      <Result type={result} />
      <ArrowChoice side={turn} />
      <div className={s.playerOne}>
        <PlayerBoard player={1} cards={player1} onClickCard={(card) => setChoiseCard(card)} turnPlayer={turn} />
      </div>
      <div className={s.board}>
        {board.map((item) => (
          <div key={item.position} className={s.boardPlate} onClick={() => handleClickBoardPlate(item.position)}>
            {item.card && <PokemonCard {...item.card} isActive minimize />}
          </div>
        ))}
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard player={2} cards={player2} onClickCard={(card) => setChoiseCard(card)} turnPlayer={turn} />
      </div>
    </div>
  );
};

export default BoardPage;
