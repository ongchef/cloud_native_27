import L from "leaflet";
// import "./map.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PlaceIcon from "@mui/icons-material/Place";
import IconButton from "@mui/material/IconButton";

export default function Map({ latitude, longtitude, name }) {
  const [open, setOpen] = useState(false);
  const mapName = name;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const mymap = L.map("mapid").setView([latitude, longtitude], 17);
    const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(OSMUrl).addTo(mymap);

    // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
    const greenIcon = new L.Icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker([latitude, longtitude], {
      icon: greenIcon,
    }).addTo(mymap);
    console.log(mapName);
    marker.bindPopup(name).openPopup();
    L.circle([latitude, longtitude], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(mymap);
  }, []);
  return (
    <div id="mapid" style={{ height: "50vh", width: "70vw" }} />

    // <>

    // <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={false}>
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //   />
    // </MapContainer>
    // </>
  );
}
