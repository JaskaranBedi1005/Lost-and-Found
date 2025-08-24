import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import noimg from "../assets/no-image.png";

function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [image, setImage] = useState(noimg);
  const [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${api}/item/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  useEffect(() => {
    if (!item || !item.image) return;

    axios
      .get(`${api}/files/${item.image}`)
      .then(() => {
        setImage(`${api}/files/${item.image}`);
      })
      .catch((error) => {
        console.error("Image not found:", error);
        setImage(noimg);
      });
  }, [item]);

  return (
    <main id="detailspage">
      <Navbar />
      <section>
        {loading ? (
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          item && (
            <div className="details-card">
              <div className="img-container">
                <img src={image} alt="Item" />
              </div>

              <div className="action-container">
                <a href={`tel:${item.phoneno}`}>
                  <CallIcon /> Call
                </a>
                <a href={`mailto:${item.email}`}>
                  <EmailIcon /> Email
                </a>
              </div>

              <h1>{item.title}</h1>

              <div className="details-container">
                <p>Founder</p>
                <p>{item.name}</p>
              </div>

              <div className="details-container desc">
                <p>{item.description}</p>
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
}

export default Details;
