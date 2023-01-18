import React from "react";
import "./Addpin.css";

const Addpin = ({ handlePinSubmit, setTitle, setDescription, setRating }) => {
  return (
    <div className="">
      <form action={handlePinSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="enter a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Review</label>
        <textarea
          type="text"
          placeholder="say something about this place"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Ratings</label>
        <select
          type="text"
          placeholder="enter a title"
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit" className="submitbutton">
          Add a pin
        </button>
      </form>
    </div>
  );
};

export default Addpin;
