import { Link } from 'react-router-dom'
import Button from './Button';

function Product(props) {
    const product = props.product

    let rupiahRp = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        useGrouping: true,
    }).format(product.price)

    function deleteProduct() {

        console.log("delete product id"+product.id)

        fetch('http://localhost:8080/api/product/' + product.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })    
        .then (response => {
            return response.text ()
        })
        .then (data => {
            console.log(data)
            alert('Delete Successed')            
        })
        .catch (err => {
            console.log (err)
        })    
    }

    return (
        <div className="card col-5 m-5">
            <h4>{product.name}</h4>
            <img
                className='card-img-top mx-auto d-block mb-3'
                src={product.art}
                style={{ width: "250px", height: "250px" }} />
            <p>Stock - {product.stock}</p>
            <p><strong>Rp {rupiahRp}</strong></p>
            <div>
            <Button className="btn btn-warning mx-auto d-block mb-3 mt-3 w-100" label="Delete Product" onClick={deleteProduct}/>
            </div>
        </div>
    )
}

export default Product