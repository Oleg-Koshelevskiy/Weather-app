import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./LeafletMap.css";

const LeafletMap = (props) => {
  const lat = props.coords.latitude;
  const lon = props.coords.longitude;

  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>Обрана локація.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
