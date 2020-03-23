import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import setAuthToken from "./utils/setAuthToken";
import { getCurrentPatient } from "./actions/index";
// let store;
//
// if (process.env.NODE_ENV === "production") {
//   store = createStore(reducers, {}, compose(applyMiddleware(reduxThunk)));
// } else {
//   store = createStore(
//     reducers,
//     {},
//     compose(
//       applyMiddleware(reduxThunk),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// }
const store = createStore(reducers, {}, compose(applyMiddleware(reduxThunk)));

if (localStorage.jwtToken) {
  // console.log(localStorage.jwtToken);
  setAuthToken(localStorage.jwtToken);
  store.dispatch(getCurrentPatient());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
