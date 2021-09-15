import { useState } from "react";
import GamePage from "./components/routes/Game/GamePage";
import HomePage from "./components/routes/Home/HomePage";

const App = () => {
  const [page, setPage] = useState("app");

  const handleChangePage = (page) => {
    setPage(page);
  };

  switch (page) {
    case "app":
      return <HomePage onChangePage={handleChangePage} />;
    case "game":
      return <GamePage onChangePage={handleChangePage} />;
    default:
      return <HomePage />;
  }
};

export default App;
