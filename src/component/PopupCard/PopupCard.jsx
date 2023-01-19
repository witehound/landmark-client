import React from "react";
import "./PopupCard.css";
import { Star } from "@mui/icons-material";
import { format } from "timeago.js";

const PopupCard = ({ p, handleDeletePin }) => {
  return (
    <div className="card" key={p._id}>
      <label>Place</label>
      <h4 className="place">{p.title}</h4>
      <label>Review</label>
      <p className="desc">{p.description}</p>
      <label>Ratings</label>
      <div className="stars">
        {Array(p.rating).fill(<Star className="star" />)}
      </div>
      <label>Information</label>
      <button className="delete" onClick={() => handleDeletePin(p._id)}>
        Delete
      </button>
      <div className="info">
        <span className="username">
          Created by{" "}
          <h4>
            {"  "} {p.userName}
          </h4>
        </span>
        <span className="date">{format(p.createdAt)}</span>
      </div>
    </div>
  );
};

export default PopupCard;
