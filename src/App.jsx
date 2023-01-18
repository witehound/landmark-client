import { useEffect, useState } from "react";
import "./App.css";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getAllpins } from "./utils";
import { Mark, Register, Login } from "./component";

function App() {
  const [cuurUser, setCurrUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewPort, setViewPort] = useState({
    longitude: 12.4,
    latitude: 38.8,
    zoom: 14,
  });
  const [showRegister, setShowReister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleAddClick = (e) => {
    let lat = e.lngLat.lat;
    let long = e.lngLat.lng;
    setNewPlace({
      lat,
      long,
    });
  };

  useEffect(() => {
    const getPins = async () => {
      const { data } = await getAllpins();
      setPins(data);
    };

    getPins();
  }, []);

  return (
    <div>
      <Map
        container={`map`}
        projection={`globe`}
        initialViewState={{ viewPort }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
        mapStyle={`mapbox://styles/wingedanubis/cld1ff9b7000o01phg2gw97bm`}
        onDblClick={(e) => {
          handleAddClick(e);
        }}
      >
        <NavigationControl />
        <Mark
          pins={pins}
          viewPort={viewPort}
          currentPlaceId={currentPlaceId}
          setCurrentPlaceId={setCurrentPlaceId}
          newPlace={newPlace}
          setNewPlace={setNewPlace}
        />
      </Map>
      <div className="footer">
        <div className="footerdown">
          {cuurUser ? (
            <button className="logoutbutton">Log out</button>
          ) : (
            <div>
              <button className="loginbutton">Log In</button>
              <button className="reigisterbutton">Register</button>
            </div>
          )}
        </div>
      </div>
      {showRegister}
      {showLogin}
    </div>
  );
}

export default App;
