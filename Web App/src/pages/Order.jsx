import './Order.css'

import ListTransaction from '../components/ListOrder'

import React, { useEffect, useState } from 'react'
import ListOrder from '../components/ListOrder'
import BarChart from '../components/BarChart'

function Order() {

    const [history, setHistory] = useState([])
    const [ rangeDate, setRangeDate ] = useState({
        minDate: new Date(),
        maxDate: new Date(),
    })

    useEffect(() => {
        fetch('http://localhost:8080/api/order-processed', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(Error)
                }
                return response.json()
            })
            .then(data => {
                setHistory(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function onChange(e) {
        setRangeDate((currData) => {
            return {...currData, [e.target.id]: e.target.value}
        })
    }
    function search(e){
        e.preventDefault()
        console.log('search'+ rangeDate.minDate)
        console.log('search'+ rangeDate.maxDate)
        fetch('http://localhost:8080/api/order-processed-date', {
            method: "Post",
            headers: {
                "Content-type":"application/json",
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(rangeDate)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(Error)
                }
            })
            .then(data => {
                console.log(data)
                setHistory(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="list">

            <form onSubmit={search} className="row g-3 justify-content-center">
                <div className="col-auto">
                    <label className='form-control'>Choose Date From: </label>
                </div>
                <div className="col-auto">
                    <input type="DateTime-local" className="form-control" id="minDate" onChange={onChange} value={rangeDate.minDate} />
                </div>
                <div className="col-auto">
                    <label className='form-control'>to: </label>
                </div>
                <div className="col-auto">
                    <input type="DateTime-local" className="form-control" id="maxDate" onChange={onChange} value={rangeDate.maxDate} />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Search</button>
                </div>
            </form>

            <table className="table table-success table-striped tableOptional">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((h, index) => (
                        <ListOrder key={index} history={h}></ListOrder>
                    ))}
                </tbody>
            </table>

            <BarChart history={history}/>
        </div>
    )
}

export default Order