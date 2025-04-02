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
  const pormestariPosition = [60.387971295934584, 25.64936744011304]; // Pormestarinkatu 14
  const tolkkinenPosition = [60.34205298694687, 25.58413372778992]; // Tolkinen
  const kanteletaloPosition = [60.38820023040421, 25.699402494474008]; // Kanteletalo B-Hall
  const hamariPosition = [60.366146512050335, 25.641467413302312]; // Hamari

  return (
    <section id="training-section" className="training-section training-page">
      <div id="training-marker"></div>
      <h1 className="section-title">TRAINING</h1>
      <div className="training-container">

        {/* Juniors Section */}
        <div className="training-item">
          <h3>Juniors</h3>
          <p>THURSDAY APRIL 3rd 17:00-18:00 @ KANTELETALO B-HALL</p>
          <p>THURSDAYS APRIL 10th - MAY 15th 18:00-19:00 @ KANTELETALO B-HALL</p>
          <LazyMap
            center={kanteletaloPosition}
            zoom={15}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={kanteletaloPosition}>
              <Popup>Kanteletalo B-Hall</Popup>
            </Marker>
          </LazyMap>
          <a
            href="https://maps.app.goo.gl/Bjar5hh3X9AaSpA17"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            View Kanteletalo on Google Maps
          </a>
          </div>

          <div className="training-item">
          <p>MONDAYS MAY 19th - SEPTEMBER 15th 17:45-18:45 @ HAMARI</p>
          <LazyMap
            center={hamariPosition}
            zoom={15}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={hamariPosition}>
              <Popup>Hamari Field</Popup>
            </Marker>
          </LazyMap>
          <a
            href="https://maps.app.goo.gl/xdfiqo9ubjDxQYNL8"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            View Hamari on Google Maps
          </a>
        </div>

        {/* Mens Section */}
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
            View Tolkkinen Tekonurmi on Google Maps
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
            View on Pormestarinkatu 14 Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default Training;
