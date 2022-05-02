let initialState = {
    categories: [],
    loading: true
}

function category (state = initialState, action) {
    switch (action.type) {
        case 'categories/setCategories':
            return {...state, categories: action.payload}
        case 'loading/setLoading':
            return {...state, loading: action.payload}
        default:
            return state;
    }
}

export default category