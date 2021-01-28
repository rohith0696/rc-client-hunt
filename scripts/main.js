/**
 * Main.js - the logic for our app
 */

// first imports.......................
// import getLocation from './location.js';
import locationsArray from '../init-locations.js';

// helper functions....................
let currentlat, currentlon;
let error;

// event handlers......................


// collects current location
async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(position => {
        return position;
    });
}

/**
 * Wait to get location and then display it.
 * Location should only be updated in response to a USER GESTURE
 */
async function locationHandler() {
    const locText = await getLocation();
    // document.getElementById('locationAnswer').innerHTML = locText;
    console.log("------location handler")
    currentlat = locText.coords.latitude;
    document.getElementById("device-lat").innerHTML =  currentlat.toFixed(6);
    currentlon = locText.coords.longitude;
    document.getElementById("device-long").innerHTML = currentlon.toFixed(6);


    locationsArray.forEach(function (value) {
        console.log(value,"---inside location array")
        if (isInside(value.latitude, value.longitude)) {
            console.log(value.name,"----inside if")

            
     document.getElementById("locationAnswer").innerHTML = value.Name;       
     error = false;
        }
    });

    if(error)
    {
        document.getElementById("error-message").innerHTML = "You are not near to any place.";
    }else {
        document.getElementById("error-message").innerHTML = "";
    }
}

function clearErrorText() {
    document.getElementById('error-message').innerHTML = '';
}

//Calculates distance
function isInside(questLat, questLon) {
    let distance = distanceBetweenLocations(questLat, questLon);
    console.log("distance: " + distance);
    if (distance < 30) {
        return true;
    } else {
        return false;
    }
}


//Calculate distance between Latitude/Longitude points
function distanceBetweenLocations(questLat, questLon) {
    const R = 6371e3;
    const φ1 = currentlat * Math.PI / 180;
    const φ2 = questLat * Math.PI / 180;
    const Δφ = (questLat - currentlat) * Math.PI / 180;
    const Δλ = (questLon - currentlon) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d; 
}

// declare main method................
function main() {
    console.log('Starting main method...');

    // get references to html elements
    const locationElement = document.getElementById('location');
    const errorElement = document.getElementById('error-message');

    // init error to empty string
    errorElement.innerHTML = '';

    locationElement.addEventListener('click', locationHandler);
    locationElement.addEventListener('touch', locationHandler);
}

// this is where it begins
window.addEventListener('load', main);

