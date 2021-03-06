let initialState = {
    favorites: []
}

function favorite(state = initialState, action) {
    switch (action.type) {
        case 'favorites/setFavorites':
            return { ...state, favorites: action.payload }
        default:
            return state
    }
}

export default favorite