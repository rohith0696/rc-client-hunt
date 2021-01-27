/**
 * Main.js - the logic for our app
 */

// first imports.......................
import getLocation from './location.js';

// helper functions....................


// event handlers......................

/**
 * Wait to get location and then display it.
 * Location should only be updated in response to a USER GESTURE
 */
async function locationHandler() {
    const locText = await getLocation();
    document.getElementById('locationAnswer').innerHTML = locText;
}

function clearErrorText() {
    document.getElementById('error-message').innerHTML = '';
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

