import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./store/Store";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(

//     <Provider store={Store}>
//       <App />
//     </Provider>
// );

ReactDOM.render(

    <Provider store={Store}>
      <App />
    </Provider>,

  document.getElementById("root")
);