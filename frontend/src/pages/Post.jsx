import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { api } from "../config";

export default function Post() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [btn, setBtn] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const submitData = async (e) => {
    e.preventDefault();
    setBtn(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneno", phone);
    formData.append("email", email);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("file", file);

    try {
      await axios.post(`${api}/item`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar("Item Posted Successfully", { variant: "success" });
      navigate("/find");
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error posting item", { variant: "error" });
      setBtn(true);
    }
  };

  return (
    <main id="postItem">
      <Navbar />
      <section>
        <h1 className="lfh1">Post Found Item</h1>
        <div className="form-container">
          <h2>Please fill all the required fields</h2>
          <form className="form" onSubmit={submitData} encType="multipart/form-data">
            <div className="input-container">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
                required
              />
            </div>
            <div className="input-container">
              <button
                type="submit"
                className="submitbtn"
                disabled={!btn}
              >
                {btn ? "Post" : "Posting..."}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
