import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ClassSearch from "./pages/ClassSearch";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Route
                    exact={true}
                    path="/"
                    render={() => (
                        <div className="App">
                            <Navbar></Navbar>
                            <Dashboard />
                        </div>
                    )}
                />
                <Route
                    exact={true}
                    path="/profile"
                    render={() => (
                        <div className="App">
                            <Navbar></Navbar>
                            <Profile />
                        </div>
                    )}
                />
                <Route
                    exact={true}
                    path="/classsearch"
                    render={() => (
                        <div className="App">
                            <Navbar></Navbar>
                            <ClassSearch />
                        </div>
                    )}
                />
            </div>
        </BrowserRouter>
    );
}

export default App;
