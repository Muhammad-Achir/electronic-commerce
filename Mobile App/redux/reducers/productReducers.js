import { Constanta } from '../../Util'

function productReducers (state = [], action) {
    switch (action.type) {
        case Constanta.SET_PRODUCTS:
            return action.payload
        default:
            return state;
    }
}

export default productReducers