import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Navigation from "./components/navigation";

import Routes from "./routes";

function App() {
    return (
        <Router>
            <Navigation />

            <Routes />
        </Router>
    );
}

export default App;
