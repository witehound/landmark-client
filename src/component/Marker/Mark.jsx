import React from "react";
import "./Mark.css";
import { Marker, Popup } from "react-map-gl";
import { LocationOnOutlined } from "@mui/icons-material";
import PopupCard from "../PopupCard/PopupCard";

const Mark = ({ pins, viewPort, currentPlaceId, setCurrentPlaceId }) => {
  const handleMarkerClicked = async (id, lat, long) => {
    setCurrentPlaceId(id);
  };
  return (
    <>
      {pins.map((el, i) => (
        <div key={i}>
          <Marker longitude={el.long} latitude={el.lat} anchor="center">
            <LocationOnOutlined
              className="icon"
              onClick={() => {
                handleMarkerClicked(el._id, el.long, el.lat);
              }}
              style={{ fontSize: viewPort.zoom * 2, color: "slateblue" }}
            />
          </Marker>
          {el._id === currentPlaceId && (
            <Popup
              longitude={el.long}
              latitude={el.lat}
              closeOnClick={false}
              closeOnMove={false}
              anchor="left"
            >
              <PopupCard p={el} />
            </Popup>
          )}
        </div>
      ))}
    </>
  );
};

export default Mark;
