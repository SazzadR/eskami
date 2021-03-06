import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Edit from "../components/Edit";
import Home from  "../components/Home"
import Create from "../components/Create"

class Routes extends Component {
    render() {
        return (
            <div className="max-w-7xl m-auto">
                <Switch>
                    <Route path="/" exact={true}>
                        <Home />
                    </Route>
                    <Route path="/campaign/:id" exact={true}>
                        <Edit />
                    </Route>
                    <Route path="/create" exact={true}>
                        <Create />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Routes;
