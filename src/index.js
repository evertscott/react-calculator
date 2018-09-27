import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router"
import Frame from "./components/Frame"


const App = () => (
    <Frame/>
);

render(<App />, document.getElementById("root"));