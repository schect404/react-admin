import React, {SyntheticEvent, useEffect, useState} from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/Role";
import {Navigate, useParams} from "react-router-dom";

const UserEdit = (props: any) => {

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const {id} = useParams();

    useEffect(() => {
            (
                async () => {
                    const response = await axios.get('roles');
                    setRoles(response.data);

                    const {data} = await axios.get(`users/${id}`);

                    setFirstName(data.first_name);
                    setSecondName(data.last_name);
                    setEmail(data.email);
                    setRoleId(data.role.id)
                }
            )();
        }, []
    )
    const submit = async (event: SyntheticEvent) => {
        event.preventDefault()

        await axios.put(`users/${id}`, {
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
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Edit User</h1>

                <div className="form-floating">
                    <input className="form-control" placeholder="First Name" id="firstName" defaultValue={firstName} required autoFocus
                           onChange={e => setFirstName(e.target.value)}
                    />
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" placeholder="Second Name" id="secondName" required defaultValue={secondName}
                           onChange={e => setSecondName(e.target.value)}
                    />
                    <label htmlFor="secondName">Second Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required defaultValue={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                    <select className="form-control" id="roleId" onChange={e => setRoleId(e.target.value)} value={roleId}>
                        {roles.map((role: Role) => {
                            return (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="role">Role</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
            </form>
        </Wrapper>
    );
}

export default UserEdit