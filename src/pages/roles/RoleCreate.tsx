import React, {SyntheticEvent, useEffect, useState} from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Permission} from "../../models/PermissionModel";
import {Navigate} from "react-router-dom";

const RoleCreate = () => {

    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("permissions");
                setPermissions(data);
            }
        )();
    }, [])

    const check = (id: number) => {
        if(selected.some(some => some === id)) {
            setSelected(selected.filter(value => value !== id))
        } else {
            setSelected([ ...selected, id])
        }
    };

    const submit = async (event: SyntheticEvent) => {
        event.preventDefault()

        await axios.post("roles", {
            name : name,
            permissions : selected
        });

        setRedirect(true);
    };

    if(redirect) {
        return(<Navigate to="/roles"></Navigate>);
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Create Role</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="name" placeholder="Name" required
                           onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating">
                    <div className="col-sm-10">
                        {
                            permissions.map((permission: Permission) => {
                                return (
                                    <div className="form-check form-check-inline col-3" key={permission.id}>
                                        <input className="form-check-input" type="checkbox"
                                            value={permission.id} onChange={() => {check(permission.id)}}
                                        />
                                        <label className="form-check-lable">{permission.name}</label>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
            </form>
        </Wrapper>
    )
}

export default RoleCreate;