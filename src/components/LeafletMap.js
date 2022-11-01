import { useState, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "./LeafletMap.css";
import AppContext from "../store/app-context";

const LeafletMap = (props) => {
  const [clickedCoords, setClickedCoords] = useState(null);
  const context = useContext(AppContext);

  const lat = context.coords.latitude;
  const lon = context.coords.longitude;

  const Recenter = () => {
    const map = useMap();

    if (!clickedCoords) {
      map.setView([lat, lon]);
    } else {
      map.setView(clickedCoords);
    }

    return (
      <Marker position={clickedCoords ? clickedCoords : [lat, lon]}>
        <Popup>
          {clickedCoords ? (
            <button onClick={getClickedCoordsData}>Показати</button>
          ) : (
            props.city
          )}
        </Popup>
      </Marker>
    );
  };

  const CoordsHandler = () => {
    const map = useMap();
    useMapEvents({
      click: (e) => {
        setClickedCoords([e.latlng.lat, e.latlng.lng]);
      },
    });

    if (!clickedCoords) return;

    map.setView(clickedCoords);

    return null;
  };

  const getClickedCoordsData = (e) => {
    e.preventDefault();
    const clickedLat = clickedCoords[0];
    const clickedLon = clickedCoords[1];
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${clickedLat}&longitude=${clickedLon}&localityLanguage=default`
    )
      .then((res) => res.json())
      .then((data) => {
        props.getCity(`${data.countryName}, ${data.city}`);
        context.useCoords(clickedLat, clickedLon);
        context.addCurrentCity(clickedLat, clickedLon, data.city);
        setClickedCoords(null);
      });
  };

  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CoordsHandler />
      <Recenter />
    </MapContainer>
  );
};

export default LeafletMap;
