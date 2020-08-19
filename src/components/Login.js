import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from '../Firebase'

function Login() {
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => console.log(result))
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="whatsapp"
                />
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                <div className="login__text">
                    Sign in with Google
                </div>
                </Button>
            </div>
            
        </div>
    )
}

export default Login
