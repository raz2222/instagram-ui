import React from 'react';
import './App.scss';
import Header from './Header/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Register from './Register/Register';
import Login from './Login/Login';

function App() {

  return (
    <Router className="App">
        <Header />

        <div className="container mt-3">
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    Home!
                </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
