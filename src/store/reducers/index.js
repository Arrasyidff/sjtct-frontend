import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import category from './category'
import book from './book'
import favorite from './favorite'

const rootReducers = combineReducers({
    category,
    book,
    favorite
})

export default createStore(rootReducers, applyMiddleware(thunk))