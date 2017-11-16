import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from './App';
import { Provider }             from 'react-redux';
import { createStore }          from 'redux';
import routerApp                from './reducers'
import { BrowserRouter }        from 'react-router-dom'

import './index.css';


let store = createStore(routerApp);


ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));




