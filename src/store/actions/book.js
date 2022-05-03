export const getBook = ({ category_id, book_id }) => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: 'loading/setLoading',
                payload: true
            })
            const { books, booksByCategories } = getState().book
            const { favorites } = getState().favorite
            let book = null
            booksByCategories.forEach(item => {
                if (item.categoryId === +category_id) {
                    item.books.forEach(subItem => {
                        if (subItem.id === +book_id) {
                            book = subItem
                            return true
                        }
                    })
                }
            });
            if (!book) {
                book = books.find(item => item.id === book_id)
            }
            if (book) {
                let getFavorite = false
                favorites.forEach(item => {
                    if (item.id === book.id) {
                        book['isFavorite'] = true
                        getFavorite = true
                        return true
                    }
                })
                if (!getFavorite) {
                    book['isFavorite'] = false
                }
            }
            dispatch({
                type: 'book/setBook',
                payload: book
            })
        } catch (error) {
            console.log('err masukk', error)            
        } finally {
            setTimeout(() => {
                dispatch({
                    type: 'loading/setLoading',
                    payload: false
                })
            }, 500);
        }
    }
}

export const setBooksByCategoryId = ({ category_id, page, queryTitle = null}) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'loading/setLoading',
                payload: true
            })
            const url = `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${category_id}`
            const fetchBooksByCategory = await fetch(url, {
                method: 'GET',
            })
            let books = await fetchBooksByCategory.json()

            if (queryTitle) {
                books = books.filter(item => item.title.toLowerCase().includes(queryTitle))
            }

            dispatch({
                type: 'books/setBooks',
                payload: books
            })
        } catch (error) {
            console.log('err masukk')            
        } finally {
            setTimeout(() => {
                dispatch({
                    type: 'loading/setLoading',
                    payload: false
                })
            }, 500);
        }
    }
}

export const setEmptyBooks = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'books/setBooks',
            payload: []
        })
    }
}

export const setBooksByCategories = ({ categoryId }) => {
    return async (dispatch, getState) => {
        const { booksByCategories } = getState().book
        try {
            dispatch({
                type: 'loading/setLoading',
                payload: true
            })
            const fetchBooksByCategory = await fetch(`https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${categoryId}&size=7`, {
                method: 'GET',
            })
            const books = await fetchBooksByCategory.json()
            let newBooks = booksByCategories
            if (newBooks.length > 0) {
                let getCategoryId = false
                newBooks.forEach(element => {
                    if(element.categoryId && element.categoryId === categoryId) {
                        getCategoryId = true
                        element.books = books
                    }
                });
                if (!getCategoryId) {
                    newBooks.push({categoryId, books})
                }
            } else {
                newBooks.push({categoryId, books})
            }
            dispatch({
                type: 'booksByCategories/setBooksByCategories',
                payload: newBooks
            })
        } catch (error) {
            console.log('err masukk')            
        } finally {
            setTimeout(() => {
                dispatch({
                    type: 'loading/setLoading',
                    payload: false
                })
            }, 500);
        }
    }
}

export const setBookFavorites = ({ isFavorite }) => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: 'bookFavorite/setBookFavorite',
                payload: isFavorite
            })
        } catch (error) {
            console.log('err masukk')
        }
    }
}