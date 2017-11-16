export const setCurrentItem = (itemId) => {
    return {
        type: 'SET_CURRENT_ITEM',
        itemId
    }
}


export const setItemsList = (itemsArray) => {
    return {
        type: 'SET_ITEMS_LIST',
        itemsArray
    }
}

