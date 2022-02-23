import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function AddProduct() {
    const history = useHistory()
    const [addProduct, setAddProduct] = useState({
        name: '',
        stock: '',
        price: '',
        description: '',
        art: '',
        id_category_product: {
            category: ''
        }
    })

    function onChange(e) {
        console.log([[e.target.id].category])
        setAddProduct((oldValue => {
            if (e.target.id !== 'id_category_product') {
                return { ...oldValue, [e.target.id]: e.target.value }
            } else {
                return { ...oldValue, [e.target.id]: {
                    category: e.target.value
                }}
            }
        }))
    }

    function saveProduct(e) {
        e.preventDefault()

        fetch('http://localhost:8080/api/product/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(addProduct)
        })
            .then(response => {
                return response.text()
            })
            .then(data => {
                console.log(data)

                setAddProduct({
                    name: '',
                    stock: '',
                    price: '',
                    description: '',
                    art: '',
                    id_category_product: {
                        category: ''
                    }
                })
                history.push ('/products')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="m-3">
            <form onSubmit={saveProduct} role="login">
                {/* <img src="http://i.imgur.com/RcmcLv4.png" class="img-responsive" alt="" /> */}
                <h4>Add Product</h4>
                <input id="name" type="text" name="name" placeholder="Product Name" required className="form-control input-lg" value={addProduct.name} onChange={onChange} />

                <input id="stock" type="number" className="form-control input-lg" placeholder="Stock" value={addProduct.stock} onChange={onChange} />

                <input id="price" type="number" className="form-control input-lg" placeholder="Price" value={addProduct.price} onChange={onChange} />

                <input id="description" type="text" className="form-control input-lg" placeholder="Description" value={addProduct.description} onChange={onChange} />

                <input id="art" type="text" className="form-control input-lg" placeholder="Art" value={addProduct.art} onChange={onChange} />

                <input id="id_category_product" type="text" className="form-control input-lg" placeholder="Category" value={addProduct.id_category_product.category} onChange={onChange} />

                <div className="pwstrength_viewport_progress"></div>
                <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Save
                </button>

            </form>
        </div>
    )
}

export default AddProduct