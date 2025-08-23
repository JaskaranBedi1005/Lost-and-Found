import { useState } from "react";

function Form() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneno: "",
        title: "",
        description: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        await fetch("http://localhost:5000/item", {
            method: "POST",
            body: formData,
        });
        // Add success/error handling as needed
    };

    return (
        <div className="form-container">
            <h1>Please fill all the required fields</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Name </label>
                <input type="text" name="name" onChange={handleChange} required />
                <label>Email </label>
                <input type="email" name="email" onChange={handleChange} required />
                <label>Phone </label>
                <input type="tel" name="phoneno" onChange={handleChange} required />
                <label>Title </label>
                <input type="text" name="title" onChange={handleChange} required />
                <label>Description </label>
                <textarea name="description" onChange={handleChange} required />
                <input type="file" name="file" onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
    );
}

export default Form;