import L from "leaflet";
import "./map.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
export default function Map(){
    return (
        <>
        
        <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={false}>
          <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
        </>
      );
}
