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
  const [clickedCoords, setClickedCoords] = useState(null);

  const lat = props.coords.latitude;
  const lon = props.coords.longitude;

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
            <button onClick={getClickedData}>Показати</button>
          ) : (
            props.city
          )}
        </Popup>
      </Marker>
    );
  };

  const GetClickedWeather = () => {
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

  const getClickedData = (e) => {
    e.preventDefault();
    const clickedLat = clickedCoords[0];
    const clickedLon = clickedCoords[1];
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${clickedLat}&longitude=${clickedLon}&localityLanguage=default`
    )
      .then((res) => res.json())
      .then((data) => {
        props.getCity(`${data.countryName}, ${data.city}`);
        props.getCoords(clickedLat, clickedLon);
        setClickedCoords(null);
      });
  };

  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GetClickedWeather />
      <Recenter />
    </MapContainer>
  );
};

export default LeafletMap;
