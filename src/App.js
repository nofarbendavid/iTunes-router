import React, {Component}       from 'react';
import MainScreen               from './components/MainScreen';
import { Switch, Route }        from 'react-router-dom'
import ItemScreen               from './components/ItemScreen';


import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path='/' component={MainScreen}/>
                    <Route exact path='/:id' component={ItemScreen}/>
                </Switch>
            </div>
        );
    }
}

export default App;