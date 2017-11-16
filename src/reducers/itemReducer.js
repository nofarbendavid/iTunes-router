const initialState = {
    itemsList: [],
    currentItemId : null
}


const itemReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_CURRENT_ITEM': {
            let updatedState = Object.assign({}, state);
            updatedState.currentItemId = action.itemId;
            return updatedState;
        }

        case 'SET_ITEMS_LIST': {
            let updatedState = Object.assign({}, state);
            updatedState.itemsList = action.itemsArray;
            return updatedState;
        }










        default:
            return state
    }
}

export default itemReducer