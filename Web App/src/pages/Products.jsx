import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import Product from "../components/Product"

import { fetchProducts } from '../store/actions'

function Products() {
    // const [products, setProducts] = useState([])
    const dispatch = useDispatch ()
    const products = useSelector (state => state.products)
    
    useEffect(() => {
        dispatch (fetchProducts())
    }, [products])

    return (
        <div className="row justify-content-center">
            <h2>List of Products</h2>
            {products.map(product => (
                <Product key={product.id} product={product}></Product>
            ))}
        </div>
    )
}

export default Products