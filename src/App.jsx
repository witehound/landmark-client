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
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleAddClick = (e) => {
    let lat = e.lngLat.lat;
    let long = e.lngLat.lng;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleShowAuth = (auth) => {
    if (auth === "LOGIN") {
      if (showLogin == true) {
        setShowLogin(false);
        return;
      }
      setShowLogin(true);
      setShowRegister(false);
    } else if (auth === "REGISTER") {
      if (showRegister == true) {
        setShowRegister(false);
        return;
      }
      setShowRegister(true);
      setShowLogin(false);
    }
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
        style={{ width: "10vw", height: "100vh" }}
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
              <button
                className="loginbutton"
                onClick={(e) => handleShowAuth("LOGIN")}
              >
                Log In
              </button>
              <button
                className="reigisterbutton"
                onClick={() => handleShowAuth("REGISTER")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {showRegister && <Register />}
      {showLogin && <Login />}
    </div>
  );
}

export default App;
