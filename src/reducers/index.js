import { combineReducers }      from 'redux';
import itemReducer              from './itemReducer';


const routerApp = combineReducers({
    itemReducer
})

export default routerApp