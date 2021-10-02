import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import classNames from "classnames";
import { NotificationContainer } from "react-notifications";

import About from "./components/routes/About/About";
import GamePage from "./components/routes/Game/GamePage";
import HomePage from "./components/routes/Home/HomePage";
import Contact from "./components/routes/Contact/Contact";
import NotFound from "./components/routes/NotFound/NotFound";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "react-notifications/lib/notifications.css";
import s from "./App.module.css";

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === "/" || location.pathname === "/game/board";

  return (
    <>
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
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
              <Footer />
            </div>
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>
  );
};

export default App;
