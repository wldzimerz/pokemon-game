import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("idToken")) {
          return <Component {...props} />;
        } else {
          alert("Please log in or register");
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
