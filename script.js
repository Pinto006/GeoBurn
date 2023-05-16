//event listener for Submit Button
    //connect to geoapify 
        //collect the time (object)
    //connect to calorisBurn
        //convert time to calories burned (object)
//save route to local storage 
//save calories burned to local storage
//display calories 
//display map of route 
//display icons
//when submit button is clicked with new submission, past burn is saved to side bar with date, distance and calories

//Ninja API - Dhk9ms+PxG5Q/IrKGhhu1g==FDn9SWMGkkEHOblQ
//Geoapify API - 7eebaa7dbab54d84b308f239e7d20bbf

//walk=walk
//bike = bicycle
var apiKey = "7eebaa7dbab54d84b308f239e7d20bbf";
// var mapUrl = `https://api.geoapify.com/v1/routing?waypoints=${lat}|${lon}&mode=${activityEl}&apiKey=7eebaa7dbab54d84b308f239e7d20bbf`;
var calorieUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activityEl}&weight=${weightEl}&duration=${timeEl}&apikey=Dhk9ms+PxG5Q/IrKGhhu1g==FDn9SWMGkkEHOblQ`;
var calorieKey = "Dhk9ms+PxG5Q/IrKGhhu1g==FDn9SWMGkkEHOblQ";
var submitBtn = document.querySelector('#search-btn');
var activityEl = document.querySelector('#activity');
var weightEl = document.querySelector('#your-weight');
var timeEl = document.querySelector('#time-burned');//in mins
var nameEl = document.querySelector('#your-name');
var startEl = document.querySelector('#starting-point');
var endEl = document.querySelector('#ending-point');
var caloriesBurnedEl = document.querySelector('#calories-burned')
var historyListEl = document.querySelector('#history-list')
var searchHistory = [];

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();

  var activity = activityEl.value;
  var weight = weightEl.value;
  var start = startEl.value;
  var end = endEl.value;

  getTimeDuration(activity, start, end);
});


function getTimeDuration(activity, start, end) {
  var geocodingApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${start}&format=json&apiKey=${apiKey}`;

  // Fetch the start point coordinates
  fetch(geocodingApiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var startCoordinatesLat = data.results[0].lat
      var startCoordinatesLon = data.results[0].lon

      // Fetch the end point coordinates
      var geocodingApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${end}&format=json&apiKey=${apiKey}`;
      return fetch(geocodingApiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var endCoordinatesLat = data.results[0].lat
          var endCoordinatesLon = data.results[0].lon

          // Call the routing API with the obtained coordinates as waypoints
          var routingApiUrl = `https://api.geoapify.com/v1/routing?waypoints=${startCoordinatesLat},${startCoordinatesLon}|${endCoordinatesLat},${endCoordinatesLon}&mode=${activity}&apiKey=${apiKey}`;

          return fetch(routingApiUrl)
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              console.log(data);
              var weight = weightEl.value;
              var duration = data.features[0].properties.time;
              getCaloriesBurned(activity, weight, duration);
            });
        });
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}

function getCaloriesBurned(activity, weight, duration) {
  var weight = weightEl.value;
  var durationMinutes = Math.floor(duration / 60)
  var apiUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&weight=${weight}&duration=${durationMinutes}`;
  
  var headers = new Headers()
  headers.append('X-Api-Key', calorieKey);

fetch(apiUrl, {
  method: 'GET',
  headers: headers
})
.then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log(data);
  var caloriesBurned = data[0].total_calories;
  displayCaloriesBurned(caloriesBurned);
})
.catch(function(error) {
  console.log('Error:', error);
});

}

function displayCaloriesBurned(caloriesBurned) {
  caloriesBurnedEl.textContent = 'Total Calories Burned: ' + caloriesBurned;
}
