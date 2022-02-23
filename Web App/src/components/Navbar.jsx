import { Link } from 'react-router-dom'

function Navbar (props) {
    let isLoggedIn = props.isLoggedIn

    return (
        <div>
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add" className="nav-link">Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/order-processed" className="nav-link">Order</Link>
                    </li>
                </ul>                
                <div className="d-flex">
                    { 
                        isLoggedIn ? <div onClick={props.logout} className="nav-link">Logout</div> :
                        <Link to="/login" className="nav-link">Login</Link>
                    }
                    {/* <Link to="/login" className="nav-link">Login</Link> */}
                </div>
            </div>
            </nav>
        </div>
        </div>
    )
}

export default Navbar