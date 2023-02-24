import React, {Component, SyntheticEvent, useState} from "react";
import '../Signin.css';
import axios from 'axios';
import {Navigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRedirect, setRedirect] = useState(false)

    const submit = async (event: SyntheticEvent) => {
        event.preventDefault()
        console.log({
            email: email,
            password: password
        })
        const {data} = await axios.post('login', {
            email: email,
            password: password
        })

        console.log(data)

        setRedirect(true)
    }

    if(isRedirect) return <Navigate to={"/"}/>

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required
                           onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" placeholder="password" required
                           onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
            </form>
        </main>
    )
}

export default Login;

