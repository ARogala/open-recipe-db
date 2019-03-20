import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Search from './Search';
import Results from './Results';
import About from './About';

import logo from '../images/logo.svg';

class App extends Component {

    render() {
        return (
            <div className="App">
                <nav className="nav">
                    <Link to="/" className="nav__link">
                        Home
                    </Link>
                    <Link to="/about" className="nav__link">
                        About
                    </Link>
                    <Link to="#" className="nav__link">
                        Random Recipe
                    </Link>
                    <Link to="#" className="nav__link">
                        Create Recipe
                    </Link>
                </nav>
                <header className="header">
                    <h1>Open Recipe Database</h1>
                    <h2>Get Cooking</h2>
                    <img className="header__img" src={logo} alt="logo" />
                </header>
                <main role="main">
                    <Route exact path="/" render={() => {
                        return (
                            <div>
                                <Search />
                                <Results />
                            </div>
                        );
                    }} />
                    <Route path="/about" render={() => <About />} />
                </main>
            </div>
        );
    }
}

export default App;




