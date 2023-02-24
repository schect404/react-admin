import React, {SyntheticEvent, useEffect, useState} from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Permission} from "../../models/PermissionModel";
import {Navigate, useParams} from "react-router-dom";

const RoleEdit = (props: any) => {

    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState(false);

     const {id} = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get("permissions");
                setPermissions(response.data);

                console.log(props);

                const {data} = await axios.get(`roles/${id}`);
                setName(data.name);
                setSelected(data.permissions.map((permission: Permission) => permission.id));
            }
        )();
    }, []);

    const check = (id: number) => {
        if(selected.some(some => some === id)) {
            setSelected(selected.filter(value => value !== id))
        } else {
            setSelected([ ...selected, id])
        }
    };

    const submit = async (event: SyntheticEvent) => {
        event.preventDefault()

        await axios.put(`roles/${id}`, {
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
                <h1 className="h3 mb-3 fw-normal">Edit Role</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="name" placeholder="Name" required
                           onChange={e => setName(e.target.value)}
                           defaultValue={name}
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
                                               checked={selected.some((value) => value === permission.id)}
                                        />
                                        <label className="form-check-label">{permission.name}</label>
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

export default RoleEdit;