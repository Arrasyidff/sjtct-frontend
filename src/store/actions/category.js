export const setCategories = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: 'loading/setLoading',
            payload: true
        })
        try {
            const fetchCategories = await fetch('https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories', {
                method: 'GET',
            })
            const categories = await fetchCategories.json()
            dispatch({
                type: 'categories/setCategories',
                payload: categories
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