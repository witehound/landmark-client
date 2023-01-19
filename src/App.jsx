import { useEffect, useState } from "react";
import "./App.css";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  getAllpins,
  loginUser,
  registerUser,
  craetepin,
  deletePin,
} from "./utils";
import { Mark, Register, Login } from "./component";
import { userData } from "./assets/constant";

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
  const [userInput, setUserInput] = useState(userData);

  const handleAddClick = (e) => {
    let lat = e.lngLat.lat;
    let long = e.lngLat.lng;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleLogin = async (e) => {
    const { userName, password } = userInput;
    e.preventDefault();
    if (userName === "" || password === " ") {
      handleExitAuth();
      return;
    }
    const { data } = await loginUser({ userName, password });
    setCurrUser(data.userName);
    handleExitAuth();
  };

  const handleRegister = async (e) => {
    const { userName, password, email } = userInput;
    e.preventDefault();
    if (userName === "" || password === " " || email === "") {
      handleExitAuth();
      return;
    }
    const { data } = await registerUser({ userName, password, email });
    setCurrUser(data);
    handleExitAuth();
  };

  const handlePinSubmit = async (e) => {
    const { title, rating, description } = userInput;
    const { long, lat } = newPlace;
    e.preventDefault();
    if (
      cuurUser === null ||
      title === "" ||
      rating === "" ||
      description === "" ||
      lat === null ||
      long === null
    ) {
      setNewPlace(null);
      handleExitAuth();
      return;
    }
    await craetepin({
      userName: cuurUser,
      title,
      rating,
      description,
      long,
      lat,
    });
    setNewPlace(null);
    getPins();
    handleExitAuth();
  };

  const handleExitAuth = () => {
    setShowLogin(false);
    setShowRegister(false);
    setUserInput(userData);
  };

  const handleInputChange = (e) => {
    if (userData[e.target.name] != null) {
      setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }
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

  const getPins = async () => {
    const { data } = await getAllpins();
    setPins(data);
  };

  const handleDeletePin = async (id) => {
    if (cuurUser === null) {
      return;
    }
    await deletePin(id);
    getPins();
  };

  useEffect(() => {
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
          handleInputChange={handleInputChange}
          handlePinSubmit={handlePinSubmit}
          cuurUser={cuurUser}
          handleDeletePin={handleDeletePin}
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
      {showRegister && (
        <Register
          handleRegister={handleRegister}
          handleExitAuth={handleExitAuth}
          handleInputChange={handleInputChange}
        />
      )}
      {showLogin && (
        <Login
          handleLogin={handleLogin}
          handleExitAuth={handleExitAuth}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}

export default App;
