'use strict';
/*global $*/

const api_key = 'IIwKvgVyokkngr9dQP4DXTYHTiIWMx2yJ5PHF2L';
const BASE_URL = 'https://api.nps.gov/api/v1/parks/';

// function getAllParks( searchTerm, query = {}, maxResults ) {
  
// }

function formatQueryParams(params) {
  for ( let i = 0; i < params.stateCode.length; i++ ) {
    const multKeys = params.stateCode.split( ' ' );

  }
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('.results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('.results-list').append(
      `<div class="results-wrapper">
      <h3 for="park-name">${responseJson.data[i].name}</h3>
      <h4 for="park-address">${responseJson.data[i].latLong}</h4>
      <p for="park description">${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}' for="link to park page">Link</a>
      </div>`
    )};
  //display the results section  
  // $('#results').removeClass('hidden');
}

function getParks(query, limit=10) {
  const params = {
    key: api_key,
    stateCode: query,
    limit,
  };
  const queryString = formatQueryParams(params);
  const url = BASE_URL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error-msg').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('.js-parks-search-form').on( 'submit', function(event) {
    console.log('event triggered');
    event.preventDefault();
    const searchTerm = $('.js-state-select').val();
    const limit = ($('.js-number-input').val() - 1 );
    console.log(searchTerm);
    console.log(limit);
    getParks( searchTerm, limit );
  });
}

$(watchForm);