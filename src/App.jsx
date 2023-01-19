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
  pinAdd,
  pinGet,
  pinDelete,
  userLogin,
  userLogout,
  userRegister,
} from "./utils";
import { success } from "./assets/constant";
import { Mark, Register, Login } from "./component";
import { userData } from "./assets/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const setLocalStorageUser = (user) => {
    localStorage.setItem("user", user);
  };

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
      userLogin();
      handleExitAuth();
      return;
    }

    try {
      const { data } = await loginUser({ userName, password });
      setCurrUser(data.userName);
      setLocalStorageUser(data.userName);
      userLogin(success);
      handleExitAuth();
    } catch (error) {
      userLogin();
      handleExitAuth();
    }
  };

  const handleRegister = async (e) => {
    const { userName, password, email } = userInput;
    e.preventDefault();
    if (userName === "" || password === " " || email === "") {
      userRegister();
      handleExitAuth();
      return;
    }

    try {
      const { data } = await registerUser({ userName, password, email });
      setCurrUser(data);
      setLocalStorageUser(data);
      userRegister(success);
      handleExitAuth();
    } catch (error) {
      userRegister();
      handleExitAuth();
    }
  };

  const handlePinSubmit = async (e) => {
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
      pinAdd();
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
    pinAdd(success);
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
    getPins(success);
    setPins(data);
  };

  const handleDeletePin = async (id) => {
    if (cuurUser === null) {
      pinDelete();
      return;
    }
    await deletePin(id);
    pinDelete(success);
    window.location.reload(false);
    getPins();
  };

  const handleLogOut = () => {
    setCurrUser(null);
    userLogout(success);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    getPins();
    const user = localStorage.getItem("user");
    if (user) setCurrUser(user);
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
        <ToastContainer position="top-left" theme="dark" />
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
            <button className="logoutbutton" onClick={handleLogOut}>
              Log out
            </button>
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
