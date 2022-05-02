export const addToFavorites = (book) => {
    return (dispatch, getState) => {
        try {
            const { favorites } = getState().favorite
            const payload = [book, ...favorites]
            dispatch({
                type: 'favorites/setFavorites',
                payload
            })
        } catch (error) {
            console.log('err masuk 123', error)
        }
    }
}

export const deleteFromFavorites = ({ bookId }) => {
    return (dispatch, getState) => {
        try {
            const { favorites } = getState().favorite
            const payload = favorites.filter(item => item.id !== bookId)
            dispatch({
                type: 'favorites/setFavorites',
                payload
            })
        } catch (error) {
            console.log('err masuk')
        }
    }
}