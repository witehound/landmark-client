import * as React from "react";
import "./App.css";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <div>
      <Map
        initialViewState={{}}
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
      ></Map>
    </div>
  );
}

export default App;
