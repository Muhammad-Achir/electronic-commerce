import { combineReducers } from 'redux'
// import userReducer from './userReducers'
import productReducer from './productReducer'
import productDetailReducer from './productDetailReducer'

const reducers = combineReducers ({
    // user: userReducer
    products: productReducer,
    productDetail: productDetailReducer
})

export default reducers