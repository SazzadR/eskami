import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from  "../components/Home"

class Routes extends Component {
    render() {
        return (
            <div className="max-w-7xl m-auto">
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Routes;
