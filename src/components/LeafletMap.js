import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./LeafletMap.css";

const LeafletMap = (props) => {
  const lat = props.coords.latitude;
  const lon = props.coords.longitude;

  const Recenter = () => {
    const map = useMap();
    map.setView([lat, lon]);
    return (
      <Marker position={[lat, lon]}>
        <Popup>{props.city}</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter />
    </MapContainer>
  );
};

export default LeafletMap;
