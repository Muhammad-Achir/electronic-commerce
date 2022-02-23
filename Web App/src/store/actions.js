import constant from "../constant";

export function setProduct (payload) {
    return { type: constant.SET_PRODUCT, payload }
}

export function setProductDetail (payload) {
    return { type: constant.SET_PRODUCT_DETAIL, payload }
}

export function fetchProducts () {
    return function (dispatch, getState) {
        fetch('http://localhost:8080/api/product/'
            , {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem ('token'),
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('error fetch')
                }
                return response.json()
            })
            .then(data => {
                // setProducts(data)
                // dispatch ({type: 'SET_PRODUCT', payload: data})
                dispatch (setProduct (data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}