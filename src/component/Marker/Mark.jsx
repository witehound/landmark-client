import React from "react";
import "./Mark.css";
import { Marker } from "react-map-gl";
import { LocationOnOutlined } from "@mui/icons-material";

const Mark = ({ pins }) => {
  return (
    <>
      {pins.map((el, i) => (
        <Marker key={i} longitude={el.long} latitude={el.lat} anchor="center">
          <LocationOnOutlined className="icon" onClick={() => {}} />
        </Marker>
      ))}
    </>
  );
};

export default Mark;
