import React from "react";
import axios from "axios";

const ImageUpload = (props: { uploaded: (url: string) => void }) => {

    const upload = async (files: FileList | null) => {
        if(files == null) return;

        const formData = new FormData();

        formData.append("image", files[0]);

        const {data} = await axios.post("upload", formData)

        props.uploaded(data.url);
    };

    return (
        <label className="btn btn-primary">
            Upload <input type="file" hidden onChange={event => upload(event.target.files)}/>
        </label>
    );
};

export default ImageUpload;