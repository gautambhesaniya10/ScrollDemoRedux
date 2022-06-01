import React from "react";
import { Provider } from "react-redux";
import Home from "./Screens/Home";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
};

export default App;
