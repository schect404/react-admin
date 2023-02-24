import React, {Component, SyntheticEvent} from "react";
import '../Signin.css';
import axios from 'axios';
import {Navigate} from "react-router-dom";

class Register extends Component {

    firstName = ''
    secondName = ''
    email = ''
    password = ''
    passwordConfirm = ''

    state = {
        redirect : false
    };

    submit = async (event: SyntheticEvent) => {
        event.preventDefault()
        console.log({
            firstName : this.firstName,
            secondName: this.secondName,
            email : this.email,
            password : this.password,
            passwordConfirm : this.passwordConfirm
        })
        const response = await axios.post('register', {
            first_name : this.firstName,
            last_name: this.secondName,
            email : this.email,
            password : this.password,
            password_confirm : this.passwordConfirm
        })

        console.log(response.data)

        this.setState({
            redirect : true
        });
    }
    render() {

        if(this.state.redirect) {
            return <Navigate to={"/login"}/>
        }

        return (
            <div>
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={this.submit}>
                        <h1 className="h3 mb-3 fw-normal">Please register</h1>

                        <div className="form-floating">
                            <input className="form-control" placeholder="First Name" id="firstName" required autoFocus
                                   onChange={e => this.firstName = e.target.value}
                            />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="form-floating">
                            <input className="form-control" placeholder="Second Name" id="secondName" required
                                   onChange={e => this.secondName = e.target.value}
                            />
                            <label htmlFor="secondName">Second Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" required
                                   onChange={e => this.email = e.target.value}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="password" placeholder="password" required
                                   onChange={e => this.password = e.target.value}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="passwordConfirm" placeholder="passwordConfirm" required
                                   onChange={e => this.passwordConfirm = e.target.value}
                            />
                            <label htmlFor="passwordConfirm">Password Confirm</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
                    </form>
                </main>
            </div>
        )
    }
}

export default Register;