import React, { useState } from 'react';
import ReactMapGl, {Marker} from 'react-map-gl';
import * as aeroDromes from '../aerodromes.json';

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

    // extract coordenate from description
    function extractLocation(pureText) {
        
        // find the coord substring
        const searched = 'COORD';

        // add to index the lenght of 'coord' and the space after
        let index = pureText.indexOf(searched) + 5;

        // create substring that contains latitude
        let coordString = pureText.substring(index, index + 23);
        let latitudeString = coordString.substring(0, coordString.indexOf('/'));

        // transform the string into number
        let latitudeNumber = 0;
        for (let i = 0, j = 0; i < latitudeString.length; i++, j++) {
            let charNow = latitudeString.charAt(i);
            if (charNow === '.' || charNow === ',' || charNow === ' ') { j--; continue;}
            if (charNow === 'N' || charNow === 'S') {
                if (charNow === 'S') {
                    latitudeNumber *= -1;
                }
                break;
            }
            latitudeNumber += parseFloat(charNow) * 10 ** -j;
        }
        latitudeNumber *= 10;

        
        // get decimal part
        let minutesPart = Math.trunc((latitudeNumber % 1) * 100);
        let secondsPart = Math.trunc(((latitudeNumber * 10000) % 1) * 100);

        // following the tip 
        minutesPart = ((minutesPart * 60) + secondsPart) / 3600;

        // exclude our decimal part 
        latitudeNumber = Math.trunc(latitudeNumber);

        // new decimal part
        latitudeNumber += minutesPart;

        // create a substring that contains longitude
        // but first we need to know how our string ends ('w' or 'e'?)
        // index of 'W' or 'E'
        let isThereW = coordString.indexOf('W') === -1 ? false : true;
        let isThereE = coordString.indexOf('E') === -1 ? false : true;
        let endingChar = '';
        if (isThereW) {
            // if the is a index of 'W' exist does 'E' exist?
            if (isThereE) {
                // if 'E' exist which one is smaller
                coordString.indexOf('W') > coordString.indexOf('E') ? endingChar = 'E' : endingChar = 'W';
            }
            else {
                endingChar = 'W';
            }
        }
        else {
            endingChar = 'E';
        }
        
        // create substring that contains longitude
        let longitudeString = coordString.substring(coordString.indexOf('/') + 1, coordString.indexOf(endingChar) + 1);

        // transform substring into number
        let longitudeNumber = 0;
        for (let i = 0, j = 0; i < longitudeString.length; i++, j++) {
            let charNow = longitudeString.charAt(i);
            if (charNow === '.' || charNow === ',' || charNow === ' ') { j--; continue;}
            if (charNow === 'W' || charNow === 'E') {
                if (charNow === 'W') {
                    longitudeNumber *= -1;
                }
                break;
            }
            longitudeNumber += parseFloat(charNow) * 10 ** -j;
        }
        longitudeNumber *= 100;

        
        minutesPart = Math.trunc((longitudeNumber % 1) * 100);
        secondsPart = Math.trunc(((longitudeNumber * 10000) % 1) * 100);

        // following the tip 
        minutesPart = ((minutesPart * 60) + secondsPart) / 3600;

        // exclude our decimal part 
        longitudeNumber = Math.trunc(longitudeNumber);

        // new decimal part
        longitudeNumber += minutesPart;

        // create something to return our lat and long
        let coordNumber = {lat: latitudeNumber, long: longitudeNumber};

        return (coordNumber);
    }

    return (
        <ReactMapGl {...viewport}
        mapboxApiAccessToken={mapToken} 
        onViewportChange={(newViewport) => {setViewport(newViewport)}}>
            {aeroDromes.aerodromes.map(function(spot) {
                let coord = extractLocation(spot.description);
                return (
                <Marker key={spot.name} latitude={coord.lat} longitude={coord.long}>
                    <div>
                        {coord.lat}
                    </div>
                </Marker>
                );
            })}
        </ReactMapGl>
    );
}