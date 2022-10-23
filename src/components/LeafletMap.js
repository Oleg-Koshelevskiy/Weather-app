import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "./LeafletMap.css";

const LeafletMap = (props) => {
  const [clickedCoords, setClickedCoords] = useState();

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

  const GetClickedCoords = () => {
    const map = useMap();
    useMapEvents({
      click: (e) => {
        console.log(e.latlng.lat, e.latlng.lng);
        setClickedCoords([e.latlng.lat, e.latlng.lng]);
      },
    });
    if (!clickedCoords) return;

    map.setView(clickedCoords);

    return (
      <Marker position={clickedCoords}>
        <Popup>
          <button>Перейти</button>
        </Popup>
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
      <GetClickedCoords />
    </MapContainer>
  );
};

export default LeafletMap;
