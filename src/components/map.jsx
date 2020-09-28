import React, { useState } from 'react';
import ReactMapGl, {Marker} from 'react-map-gl';
import * as aeroDromes from '../aerodromes.json';

export default function Map() {
    // setting style of the map
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: -16.0,
        longitude: -49.0,
        zoom: 1
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
        let minutesPart = 0;
        let secondsPart = 0;
        // another expensive methode without using replace
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
            // add to hours, minutes and seconds
            if (j > 1) {
                if (j > 3) {
                    secondsPart += parseFloat(charNow) * 10 ** (5-j);
                }
                else {
                    minutesPart += parseFloat(charNow) * 10 ** (3-j);
                }
            }
            else {
                latitudeNumber += parseFloat(charNow) * 10 ** -j;
            }
        }
        latitudeNumber *= 10;
        console.log('minutes: ' + minutesPart + ' /// ' + 'seconds: ' + secondsPart);
        // following the tip 
        secondsPart = ((minutesPart * 60) + secondsPart) / 3600;

        // exclude our decimal part if the float has some converting issue
        latitudeNumber = Math.trunc(latitudeNumber);

        // new decimal part if lat is positive or negative
        if (latitudeNumber > 0) {
            latitudeNumber += secondsPart;
        }
        else {
            latitudeNumber -= secondsPart;
        }

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
        //      NOTA DE RECONSIDERAÇÃO
        //  o código ficaria mais limpo e fácil usando string.replace()
        //  mas como essa versão já está feita e ela burla problemas 
        // que o replace não conseguiria, então decidi continuar com essa função
        let longitudeNumber = 0;
        secondsPart = 0;
        minutesPart = 0;
        for (let i = 0, j = -1; i < longitudeString.length; i++, j++) {
            let charNow = longitudeString.charAt(i);
            if (charNow === '.' || charNow === ',' || charNow === ' ') { j--; continue;}
            if (charNow === 'W' || charNow === 'E') {
                if (charNow === 'W') {
                    longitudeNumber *= -1;
                }
                break;
            }
            // add to hours, minutes and seconds
            if (j > 1) {
                if (j > 3) {
                    secondsPart += parseFloat(charNow) * 10 ** (5-j);
                }
                else {
                    minutesPart += parseFloat(charNow) * 10 ** (3-j);
                }
            }
            else {
                longitudeNumber += parseFloat(charNow) * 10 ** -j;
            }
        }
        longitudeNumber *= 10;

        // following the tip 
        secondsPart = ((minutesPart * 60) + secondsPart) / 3600;

        // exclude our decimal part as we did for latitude
        longitudeNumber = Math.trunc(longitudeNumber);

        // new decimal part
        if(longitudeNumber > 0) {
            longitudeNumber += secondsPart;
        }
        else {
            longitudeNumber -= secondsPart;
        }
        

        // create something to return our lat and long
        let coordNumber = {lat: latitudeNumber, long: longitudeNumber};

        return (coordNumber);
    }

    return (
        <ReactMapGl {...viewport}
        mapboxApiAccessToken={mapToken} 
        onViewportChange={(newViewport) => {setViewport(newViewport)}}
        >
            {aeroDromes.aerodromes.map(function(spot) {
                let coord = extractLocation(spot.description);
                return (
                <Marker key={spot.name} latitude={coord.lat} longitude={coord.long}>
                    <div style={{
                        backgroundColor: "black",
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderRadius: 500,
                        opacity: 0.5,
                        // trying to emulate the fixed size radius of 5km. But it is not calculated.
                        width: 0.05*viewport.zoom**3.5,
                        height: 0.05*viewport.zoom**3.5,
                    }}>
                        
                    </div>
                </Marker>
                );
            })}
        </ReactMapGl>
    );
}