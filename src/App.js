import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import classNames from "classnames";

import About from "./components/routes/About/About";
import GamePage from "./components/routes/Game/GamePage";
import HomePage from "./components/routes/Home/HomePage";
import Contact from "./components/routes/Contact/Contact";
import NotFound from "./components/routes/NotFound/NotFound";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import Footer from "./components/Footer/Footer";

import { FireBaseContext } from "./context/firebaseContext";
import FirebaseClass from "./services/firebase";

import s from "./App.module.css";

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === "/" || location.pathname === "/game/board";

  return (
    <FireBaseContext.Provider value={FirebaseClass}>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div
              className={classNames(s.wrap, {
                [s.isHomePage]: isPadding,
              })}
            >
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
              <Footer />
            </div>
          </>
        </Route>
      </Switch>
    </FireBaseContext.Provider>
  );
};

export default App;
