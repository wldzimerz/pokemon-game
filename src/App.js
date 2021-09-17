import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import classNames from "classnames";
import About from "./components/routes/About/About";
import GamePage from "./components/routes/Game/GamePage";
import HomePage from "./components/routes/Home/HomePage";
import Contact from "./components/routes/Contact/Contact";
import NotFound from "./components/routes/NotFound/NotFound";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import Footer from "./components/Footer/Footer";
import s from "./App.module.css";

const App = () => {
  const match = useRouteMatch("/");
  return (
    <Switch>
      <Route path="/404" component={NotFound} />
      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
          <div
            className={classNames(s.wrap, {
              [s.isHomePage]: match.isExact,
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
  );
};

export default App;
