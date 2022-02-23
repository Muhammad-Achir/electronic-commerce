import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Register() {
    const history = useHistory()

    const [ createAccount, setCreateAccount ] = useState ({
        name: '',
        password: ''
    })

    function onChange (e) {
        setCreateAccount((oldValue => {
            return { ...oldValue, [e.target.id]: e.target.value }
        }))
    }

    function register (e) {
        e.preventDefault ()

        fetch ('http://localhost:8080/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (createAccount)
        })
        .then (response => {
            return response.text()
        })
        .then (data => {
            console.log(data)
            setCreateAccount({
                name: '',
                password: ''
            })
            history.push ('/login')
        })
        .catch (err => {
            console.log(err)
        })
    }

    return (
        <div className="m-3">
            <form onSubmit={register} role="login">
                {/* <img src="http://i.imgur.com/RcmcLv4.png" class="img-responsive" alt="" /> */}
                <h4>Create Account</h4>
                <input id="name" type="text" name="name" placeholder="Name" required className="form-control input-lg" value={createAccount.name} onChange={onChange}/>

                <input id="password" type="password" className="form-control input-lg" placeholder="Password" value={createAccount.password} onChange={onChange}/>


                <div className="pwstrength_viewport_progress"></div>
                <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Register
                </button>
                
            </form>
        </div>
    )
}

export default Register