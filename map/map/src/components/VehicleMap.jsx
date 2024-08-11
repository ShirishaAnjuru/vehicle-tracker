import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Vehicle from "../../public/Vehicle.svg";
// Create a custom icon for the vehicle
const vehicleIcon = new L.Icon({
  iconUrl: Vehicle, // Ensure you have an appropriate icon in assets
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const VehicleMap = () => {
  const [position, setPosition] = useState([17.385044, 78.486671]); // Default position
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/vehicle-location"
        );
        const { latitude, longitude } = response.data;
        if (latitude && longitude) {
          const newPosition = [latitude, longitude];
          setPosition(newPosition);
          setRoute((prevRoute) => [...prevRoute, newPosition]);
        }
      } catch (error) {
        console.error("Failed to fetch vehicle location", error);
      }
    };
    const interval = setInterval(fetchVehicleData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={vehicleIcon} />
      <Polyline positions={route} color="blue" />
    </MapContainer>
  );
};

export default VehicleMap;
