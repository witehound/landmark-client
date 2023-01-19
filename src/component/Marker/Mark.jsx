import React, { useState } from "react";
import "./Mark.css";
import { Marker, Popup } from "react-map-gl";
import { LocationOnOutlined } from "@mui/icons-material";
import { PopupCard, Addpin } from "../index";

const Mark = ({
  pins,
  viewPort,
  currentPlaceId,
  setCurrentPlaceId,
  newPlace,
  setNewPlace,
  handleInputChange,
}) => {
  const handleMarkerClicked = async (id, lat, long) => {
    setCurrentPlaceId(id);
  };

  const handlePinSubmit = () => {};

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
      {newPlace && (
        <Popup
          longitude={newPlace.long}
          latitude={newPlace.lat}
          closeOnClick={false}
          closeOnMove={false}
          onClose={() => {
            setNewPlace(null);
          }}
          anchor="left"
        >
          <Addpin
            handlePinSubmit={handlePinSubmit}
            handleInputChange={handleInputChange}
          />
        </Popup>
      )}
    </>
  );
};

export default Mark;
