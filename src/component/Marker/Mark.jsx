import React, { useState } from "react";
import "./Mark.css";
import { Marker, Popup } from "react-map-gl";
import { LocationOn } from "@mui/icons-material";
import { PopupCard, Addpin } from "../index";

const Mark = ({
  pins,
  viewPort,
  currentPlaceId,
  setCurrentPlaceId,
  newPlace,
  setNewPlace,
  handleInputChange,
  handlePinSubmit,
  cuurUser,
}) => {
  const handleMarkerClicked = async (id, lat, long) => {
    setCurrentPlaceId(id);
  };

  return (
    <>
      {pins.map((el, i) => (
        <div key={i}>
          <Marker longitude={el.long} latitude={el.lat} anchor="center">
            <LocationOn
              onClick={() => {
                handleMarkerClicked(el._id, el.long, el.lat);
              }}
              style={{ fontSize: viewPort.zoom * 2 }}
              className={`${cuurUser ? `activeuserpin` : `otheruserpin`} icon`}
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
