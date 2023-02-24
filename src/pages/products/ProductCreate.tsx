import React, {SyntheticEvent, useState} from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Navigate} from "react-router-dom";
import ImageUpload from "./ImageUpload";

const ProductCreate = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submit = async (event: SyntheticEvent) => {
        event.preventDefault();
        await axios.post("products",
            {
                title,
                description,
                image,
                price
            });

        setRedirect(true);
    };

    if (redirect) return <Navigate to={"/products"}/>

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Create Product</h1>

                <div className="form-floating">
                    <input className="form-control" placeholder="Title" id="title" required autoFocus
                           onChange={e => setTitle(e.target.value)}
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Description" id="description" required
                              onChange={e => setDescription(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating">
                    <label>Image</label>
                    <div className="input-group">
                        <input className="form-control" id="image" placeholder="Image" required
                               value={image}
                               onChange={e => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="form-floating">
                    <input type="number" className="form-control" id="price" placeholder="Price" required
                           onChange={e => setPrice(e.target.value)}
                    />
                    <label htmlFor="price">Price</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
            </form>
        </Wrapper>
    )
};

export default ProductCreate;