import { Button } from '@material-ui/core';
import React from 'react'
import { auth, provider } from './firebase';
import "./Login.css"
import logo from "./logo.png" 
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

export default function Login() {
    const [, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <img 
                    src={logo}
                    alt="wtsapp logo"
                />
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
              
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
}
