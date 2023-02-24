import React, {SyntheticEvent, useEffect, useState} from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/Role";
import {Navigate} from "react-router-dom";

const UserCreate = () => {

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
            (
                async () => {
                    const {data} = await axios.get('roles');
                    setRoles(data);
                }
            )();
        }, []
    )
    const createUser = async (event: SyntheticEvent) => {
        event.preventDefault()

        await axios.post('users', {
            first_name : firstName,
            last_name: secondName,
            email: email,
            role_id: roleId
        })

        setRedirect(true);
    }

    if(redirect) {
        return (
            <Navigate to="/users"/>
        )
    }

    return (
        <Wrapper>
            <form onSubmit={createUser}>
                <h1 className="h3 mb-3 fw-normal">Create User</h1>

                <div className="form-floating">
                    <input className="form-control" placeholder="First Name" id="firstName" required autoFocus
                           onChange={e => setFirstName(e.target.value)}
                    />
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" placeholder="Second Name" id="secondName" required
                           onChange={e => setSecondName(e.target.value)}
                    />
                    <label htmlFor="secondName">Second Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required
                           onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                    <select className="form-control" id="roleId" onChange={e => setRoleId(e.target.value)}>
                        {roles.map((role: Role) => {
                            return (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="role">Role</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Create</button>
            </form>
        </Wrapper>
    );
}

export default UserCreate