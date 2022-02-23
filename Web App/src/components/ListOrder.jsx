function ListOrder(props) {
    const history = props.history
    let rupiahRp = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        useGrouping: true,
    }).format(history.price)
    return (
        <tr>
            <th scope="row">{history.id}</th>
            <td>{history.orderDate}</td>
            <td>{history.status}</td>
            <td>{history.productName}</td>
            <td>{rupiahRp}</td>
            <td>{history.quantity}</td>
        </tr>
    )
}

export default ListOrder