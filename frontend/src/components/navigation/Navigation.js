import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create">Create Campaign</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;
