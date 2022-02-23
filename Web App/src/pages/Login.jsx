import './Login.css'

import { useState, } from 'react'
import { useHistory, Link } from 'react-router-dom'

function Login(props) {
    const history = useHistory()

    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    })

    function onChange(e) {
        setCredentials((oldValue) => {
            return { ...oldValue, [e.target.id]: e.target.value }
        })
    }

    function login(e) {
        e.preventDefault()

        fetch('http://localhost:8080/api/login', {
            method: "POST"
            ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => {
                return response.json()
                //    return response.json ()
            })
            .then(data => {
                console.log(data)

                if (data.token) {
                    localStorage.setItem('token', data.token)
                    props.setLogin()
                    history.push('/products')
                } else {
                    alert('Wrong username or password');
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="container">

            <div className="row" id="pwd-container">
                <div className="col-md-4"></div>

                <div className="col-md-4">
                    <section className="login-form">
                        <form onSubmit={login} role="login">
                            <h4>Login</h4>
                            <input type="text" id='name' name="name" placeholder="Name" required className="form-control input-lg" value={credentials.name} onChange={onChange} />

                            <input type="password" className="form-control input-lg" id="password" placeholder="Password" required="" value={credentials.password} onChange={onChange} />


                            <div className="pwstrength_viewport_progress"></div>


                            <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Sign in</button>
                            <div>
                                <Link to="/register">Create account</Link> or <Link to="#">reset password</Link>
                            </div>
                        </form>

                        <div className="form-links">
                            <Link to="/" className='text-dark'>www.aicommerce.net</Link>
                        </div>
                    </section>
                </div>

                <div className="col-md-4"></div>
            </div>
        </div>
    )
}
export default Login