import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from '../Firebase'
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider'
import { useCookies } from 'react-cookie';

function Login() {
    const [{}, dispatch] = useStateValue();
    const [cookies, setCookie] = useCookies(['logged']);

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                setCookie('displayName', result.user.displayName)
                setCookie('photoURL', result.user.photoURL)
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
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
