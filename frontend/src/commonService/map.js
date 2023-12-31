import L from "leaflet";
// import "./map.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Map({ address, name }) {
  const [open, setOpen] = useState(false);
  const mapName = name;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const url = ("https://geocode.search.hereapi.com/v1/geocode" +
       "?apikey=A7Y_Qts68t_XwB9IUyFcbh9LOlUCQ50gVQuAXEJDJAU" +
       "&q="+address)
    axios.get(url).then((res)=>{
      console.log(res)
      const lat = res.data.items[0].position.lat
      const lon = res.data.items[0].position.lng
      const mymap = L.map("mapid").setView([lat, lon], 17);
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
  
      const marker = L.marker([lat, lon], {
        icon: greenIcon,
      }).addTo(mymap);
      console.log(mapName);
      marker.bindPopup(name).openPopup();
      L.circle([lat, lon], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 10,
      }).addTo(mymap);
    })
    
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
