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
var calorieUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activityEl}&weight${weightEl}&duration${timeEl}&apikey=Dhk9ms+PxG5Q/IrKGhhu1g==FDn9SWMGkkEHOblQ`;
var calorieKey = "Dhk9ms+PxG5Q/IrKGhhu1g==FDn9SWMGkkEHOblQ";
var submitBtn = document.querySelector('#search-btn');
var activityEl = document.querySelector('#activity');
var weightEl = document.querySelector('#your-weight');
var timeEl = document.querySelector('#time-burned');//in mins
var nameEl = document.querySelector('#your-name');
var startEl = document.querySelector('#starting-point');
var endEl = document.querySelector('#ending-point');
// var lat =
// var lon = 

var pastBurnEl = document.querySelector('.prevBurns') 

function getBodyAndStatus(event) {
    event.preventDefault();
const data = [
    "668 Cedar St, San Carlos, CA 94070, United States of America",
    "545 Southwest Taylor Street, Portland, OR 97204, United States of America",
    "1415 Southwest Park Avenue, Portland, OR 97201, United States of America"
];

const url = `https://api.geoapify.com/v1/batch/geocode/search?apiKey=7eebaa7dbab54d84b308f239e7d20bbf`;

fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  
  .then((result) => {
    if (result.status !== 202) {
      return Promise.reject(result)
    } else {
      console.log("Job ID: " + result.body.id);
      console.log("Job URL: " + result.body.url);
    }
  })
  .catch(err => console.log(err));
};
// var getCalories = function (event) {
//     event.preventDefault();
//     console.log('clicked', event)
//     weightEl.value;
//     console.log(weightEl.value);
//         // fetch(mapUrl)
//     var name = document.querySelector("#your-name").value;
//     var calories = document.querySelector("#calories-burned").value; 
//     var time = document.querySelector("#time-burned").value;

//     if (!name || !activityEl || !weightEl || !startEl || !endEl) {
//         return;
//       }
//       fetch (mapUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       fetch(calorieUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then 
// };

submitBtn.addEventListener('click', getBodyAndStatus);

// function displayprevBurns (){

// }

