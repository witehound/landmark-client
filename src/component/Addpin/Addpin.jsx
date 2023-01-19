import React from "react";
import "./Addpin.css";

const Addpin = ({ handlePinSubmit, handleInputChange }) => {
  return (
    <div className="addpincontainer">
      <form onSubmit={(e) => handlePinSubmit(e)} className="addpinform">
        <label>Title</label>
        <input
          type="text"
          placeholder="enter a title"
          name="title"
          onChange={(e) => handleInputChange(e)}
        />
        <label>Review</label>
        <textarea
          type="text"
          placeholder="say something about this place"
          name="description"
          onChange={(e) => handleInputChange(e)}
        />
        <label>Ratings</label>
        <select
          type="text"
          placeholder="enter a title"
          name="rating"
          onChange={(e) => handleInputChange(e)}
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
