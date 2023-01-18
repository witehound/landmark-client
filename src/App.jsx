import * as React from "react";
import "./App.css";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <div>
      <Map
        container={`map`}
        projection={`globe`}
        initialViewState={{}}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
        mapStyle={`mapbox://styles/wingedanubis/cld1ff9b7000o01phg2gw97bm`}
      ></Map>
    </div>
  );
}

export default App;
