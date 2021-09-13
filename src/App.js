import "./App.css";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import background1 from "./assets/bg3.jpg";
import background2 from "./assets/bg1.jpg";
import POKEMONS from "../src/data/pokemons.json";
import PokemonCard from "./components/Pokemon Card/PokemonCard";

function App() {
  return (
    <>
      <Header title="Pokemon game" descr="This is simple triple triad card game" />
      <Layout title="Rules" urlBg={background1}>
        <p>
          In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
        </p>
      </Layout>
      <Layout title="Cards" colorBg="#e2e2e2">
        <div className="flex">
          {POKEMONS.map((item) => (
            <PokemonCard key={item.id} name={item.name} type={item.type} img={item.img} values={item.values} id={item.id} />
          ))}
        </div>
      </Layout>
      <Layout title="thirdLayout title" urlBg={background2}>
        <p>
          To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where
          the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be
          captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the
          player's color instead.
        </p>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
