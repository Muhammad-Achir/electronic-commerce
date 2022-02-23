import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constanta } from "../Util";

function setProduct(payload) {
    return { type: Constanta.SET_PRODUCTS, payload }
}

//middleware
export function fetchProducts(ac) {
    if (!ac) {
        ac = 'a'
    }

    return function (dispatch) {            
        AsyncStorage.getItem('token')
        .then(dataToken => {
            if (dataToken !== null) {
                fetch(`http://192.168.43.28:8080/api/search?q=${ac}&page=0&size=20&sort=TITLE`, {
                    method: 'geT',
                    headers: {
                        Authorization: `Bearer ${dataToken}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json()   
                    } else {
                        throw new Error ("error fetch")
                    }
                })
                .then(data => {
                    dispatch(setProduct(data))
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })   
    }
}

