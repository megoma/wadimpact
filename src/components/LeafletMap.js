'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import L from 'leaflet';
import { useEffect } from 'react';

function SetViewOnClick({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords && coords.length === 2 && coords[0] !== null && coords[1] !== null) {
            map.flyTo(coords, map.getZoom(), {
                animate: true,
                duration: 3 // Duration of the animation in seconds
            });
            console.log('Map coordinates updated:', coords);
        }
        console.log('Map coordinates not updated:', coords);
        
    }, [coords, map]);
    return null;
}

export default function LeafletMapClient({ coordinates }) {
    const defaultPosition = [51.505, -0.09]; // Default coordinates (London as an example)
    const position = coordinates || defaultPosition;
    const zoom = 13;

    const popupContent = (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Number of participants:</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Number of sites:</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Number of people:</td>
                        <td>500</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="w-full h-full">
            <MapContainer
                center={position}
                zoom={zoom}
                style={{ width: '100%', height: '100%' }} // Ensure map container takes full height and width
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup>{popupContent}</Popup>
                </Marker>
                <SetViewOnClick coords={position} />
            </MapContainer>
        </div>
    );
}
