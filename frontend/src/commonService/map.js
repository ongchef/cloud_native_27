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

export default function Map(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const mymap = L.map("mapid").setView(
      [25.014057657671447, 121.53812819619687],
      17
    );
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

    const marker = L.marker([25.014057657671447, 121.53812819619687], {
      icon: greenIcon,
    }).addTo(mymap);

    marker.bindPopup("管理學院").openPopup();

    L.circle([25.03418, 121.564517], {
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
