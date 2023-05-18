// Declare many variables
var apiKey = "7eebaa7dbab54d84b308f239e7d20bbf";
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
var historyListEl = document.querySelector('#history-list');
var searchHistory = [];
var iconEl = document.querySelector('#icon');
var userName = document.querySelector('#userName');
var userCalories = document.querySelector('#userCalories');
var activity;
var entryArray = [];
var userInfo = document.querySelector('.userInfo');

//event listener for Submit Button
submitBtn.addEventListener('click', function(event) {
  event.preventDefault();

  var activity = activityEl.value;
  var start = startEl.value;
  var end = endEl.value;
  
  getTimeDuration(activity, start, end);
  
});

//function to call Geoapify API using values from user form
function getTimeDuration(activity, start, end) {
  var geocodingApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${start}&format=json&apiKey=${apiKey}`;

  // Fetch the start point coordinates latitude and longitude
  fetch(geocodingApiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var startCoordinatesLat = data.results[0].lat
      var startCoordinatesLon = data.results[0].lon

      // Fetch the end point coordinates latitude and longitude
      var geocodingApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${end}&format=json&apiKey=${apiKey}`;
      return fetch(geocodingApiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var endCoordinatesLat = data.results[0].lat
          var endCoordinatesLon = data.results[0].lon

          // Call the routing API from Geoapify with the obtained coordinates as waypoints
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
//function to call Calories Burned Ninja API
function getCaloriesBurned(activity, weight, duration) {
  var weight = weightEl.value;
  var durationMinutes = Math.floor(duration / 60)
  //update the activiy name to Ninjas prerferred name for bicycle, which is cycling
  var apiNinjaActivity = activity === "bicycle" ? "cycling" : activity;
  var apiUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${apiNinjaActivity}&weight=${weight}&duration=${durationMinutes}`;

  //Ninja API requires key in the header
  var headers = new Headers()
  headers.append('X-Api-Key', calorieKey);

// fetch total calories from API Ninja
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

  // Save data to local storage
   var entry = {
    name: nameEl.value,
    start: startEl.value,
    end: endEl.value,
    caloriesBurned: caloriesBurned,
    activity: activity
  };
  entryArray.push(entry);
  localStorage.setItem("entries", JSON.stringify(entryArray));
  //calling all needed functions
  displayPreviousBurns();
  clearBox();
  displayCaloriesBurned(caloriesBurned);
  displayIcon();
  
})
.catch(function(error) {
  console.log('Error:', error);
});

}
//function to display total calories burned 
function displayCaloriesBurned(caloriesBurned) {
  
  const div = document.createElement('div');
  const name = document.createElement('h1');
  const calories = document.createElement('h2');
 
  name.innerText = nameEl.value
  calories.innerText = 'Calories You Will Burn: ' + caloriesBurned;
  userName.appendChild(name);
  userCalories.appendChild(calories);
};
//function to display icon based on activity chosen
function displayIcon () {
  var icon = document.createElement("img");
  if (activityEl.value === "bicycle") {
    icon.src = 'images/Bike-Icon.png'
  } else {
    icon.src = 'images/Walking-Icon.png'
  }
  iconEl.appendChild(icon); 
  };

//function to clear content in HTML for icon, name and calories when new route is submitted
  function clearBox() { 
    iconEl.innerHTML = ""
    userName.innerHTML = ""
    userCalories.innerHTML = ""
}; 
// function to display previous burns in table
  function displayPreviousBurns() {
    historyListEl.innerHTML = ''; // Clear previous content
  
    entryArray = JSON.parse(localStorage.getItem('entries')) || [];
  
    // Reference the table body element
    var tableBody = document.querySelector('.prevBurns');
  
    // Clear existing table rows
    tableBody.innerHTML = '';
  
    for (var i = 0; i < entryArray.length; i++) {
      // Create a new table row
      var row = document.createElement('tr');
  
      // Create table cells and populate data
      var nameCell = document.createElement('td');
      nameCell.textContent = entryArray[i].name;
  
      var startingCell = document.createElement('td');
      startingCell.textContent = entryArray[i].start;
  
      var endCell = document.createElement('td');
      endCell.textContent = entryArray[i].end;
  
      var caloriesCell = document.createElement('td');
      caloriesCell.textContent = entryArray[i].caloriesBurned;
  
      var activityCell = document.createElement('td');
      activityCell.textContent = entryArray[i].activity;
  
      // Append table cells to the table row
      row.appendChild(nameCell);
      row.appendChild(startingCell);
      row.appendChild(endCell);
      row.appendChild(caloriesCell);
      row.appendChild(activityCell);
  
      // Append the table row to the table body
      tableBody.appendChild(row);
    }
 };
  
  // Call this function after the page loads to display any existing records
  displayPreviousBurns();
  

 



  