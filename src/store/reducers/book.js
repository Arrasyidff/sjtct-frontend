let initialState = {
    book: null,
    books: [],
    loading: true,
    booksByCategories: [],
    booksByCategoriesLoading: true
}

function book (state = initialState, action) {
    switch (action.type) {
        case 'book/setBook':
            return {...state, book: action.payload}
        case 'bookFavorite/setBookFavorite':
            return {...state, book: {...state.book, isFavorite: action.payload}}
        case 'books/setBooks':
            return {...state, books: action.payload}
        case 'loading/setLoading':
            return {...state, loading: action.payload}
        case 'booksByCategories/setBooksByCategories':
            return {...state, booksByCategories: action.payload}
        default:
            return state;
    }
}

export default book