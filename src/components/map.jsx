import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {
    // setting style of the map
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: -22.05272,
        longitude: -47.85586,
        zoom: 18
    });

    // it is said to create env.local for safety, but it is a free token.
    const mapToken = 'pk.eyJ1IjoidGh1bmRhcmVzIiwiYSI6ImNrZmo0OWE3bTFlZ2wycmxtM3N1d2hvbDAifQ.rhLWaQwfVEpObwJAs4Mvgw';

    return (
        <ReactMapGl {...viewport}
        mapboxApiAccessToken={mapToken} 
        onViewportChange={(newViewport) => {setViewport(newViewport)}}>
        </ReactMapGl>
    );
}