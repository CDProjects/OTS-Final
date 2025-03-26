import React from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import LazyMap from "./LazyMap"; // Import LazyMap from the new file
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Training.css";

// Fix for default marker icon (same as before)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Training = () => {
  const pormestariPosition = [60.387971295934584, 25.64936744011304]; // Latitude and Longitude for Pormestarinkatu 14
  const tolkkinenPosition = [60.34205298694687, 25.58413372778992]; // Replace with actual coordinates for Tolkinen

  return (
    <section id="training-section" className="training-section training-page">
      <div id="training-marker"></div>
      <h1 className="section-title">TRAINING</h1>
      <div className="training-container">
        {/* 
<div className="training-item">
  <h3>Juniors</h3>
  <p>THURSDAYS 18:30-19:30 @ KOKON GRASS PITCH</p>
  <LazyMap
    center={kokonPosition}
    zoom={13}
    scrollWheelZoom={false}
    className="map"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={kokonPosition}>
      <Popup>Kokon Grass Pitch</Popup>
    </Marker>
  </LazyMap>
  <a
    href="https://maps.app.goo.gl/jxtehzqJn4foogGX6"
    target="_blank"
    rel="noopener noreferrer"
    className="map-link"
  >
    View on Google Maps
  </a>
</div> 
*/}

        <div className="training-item">
          <h3>Mens</h3>
          <p>
            TUESDAYS and THURSDAYS from 1.4 19:45-21:30 @ TOLKKINEN TEKONURMI
          </p>
          <LazyMap
            center={tolkkinenPosition}
            zoom={13}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={tolkkinenPosition}>
              <Popup>Tolkkinen Tekonurmi</Popup>
            </Marker>
          </LazyMap>
          <a
            href="https://maps.app.goo.gl/4rSsEfWw8eXcHYsm9"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            View on Google Maps
          </a>
        </div>
        <div className="training-item">
          <p>SUNDAYS 17:30-19:00 @ PORMESTARINKATU 14</p>
          <LazyMap
            center={pormestariPosition}
            zoom={13}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={pormestariPosition}>
              <Popup>Pormestarinkatu 14</Popup>
            </Marker>
          </LazyMap>
          <a
            href="https://maps.app.goo.gl/4ZXNjN7W8CaWBVUAA"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default Training;
