import noImage from "../assets/no-image.png";

export default function Itemcard(props) {
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const imageSrc = props.image
    ? `${BASE_URL.replace(/\/$/, "")}${props.image.startsWith("/") ? props.image : "/" + props.image}`
    : noImage;

  return (
    <a href={"/find/details/" + props.id} data-aos="fade-up">
      <div className="card">
        <div className="card-img">
          <img
            src={imageSrc}
            alt={props.title}
            onError={e => { e.target.onerror = null; e.target.src = noImage; }}
          />
        </div>
        <div className="card-desc">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </a>
  );
}
