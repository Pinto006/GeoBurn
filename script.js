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
// var lat =
// var lon = 
// const url = `https://api.geoapify.com/v1/batch/geocode/search?apiKey=7eebaa7dbab54d84b308f239e7d20bbf`;
var pastBurnEl = document.querySelector('.prevBurns') 

// function getBodyAndStatus(event) {

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

function getBodyAndStatus(response,event) {
  event.preventDefault();
  return response.json().then(responceBody => {
    return {
      status: response.status,
      body: responceBody
    }
  });
}

function getAsyncResult(url, timeout /*timeout between attempts*/, maxAttempt /*maximal amount of attempts*/) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      repeatUntilSuccess(resolve, reject, 0)
    }, timeout);
  });

  function repeatUntilSuccess(resolve, reject, attempt) {
    console.log("Attempt: " + attempt);
    fetch(url)
      .then(getBodyAndStatus)
      .then(result => {
        if (result.status === 200) {
          resolve(result.body);
        } else if (attempt >= maxAttempt) {
          reject("Max amount of attempt achived");
        } else if (result.status === 202) {
          // Check again after timeout
          setTimeout(() => {
            repeatUntilSuccess(resolve, reject, attempt + 1)
          }, timeout);
        } else {
          // Something went wrong
          reject(result.body)
        }
      })
      .catch(err => reject(err));
  };
}

fetch(url, {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(getBodyAndStatus)
.then((result) => {
  if (result.status !== 202) {
    return Promise.reject(result)
  } else {
    return getAsyncResult(`${url}&id=${result.body.id}`, 60 * 1000 /* 60 seconds */, 100).then(queryResult => {
      console.log(queryResult);
      return queryResult;
    });
  }
})
.catch(err => console.log(err));

fetch (calorieUrl)
.then(function(response)  {
  return response.json();
})
.then(function(response)  {
  console.log(response)
  displayResults (response)
});
var displayResults = function(data)  {
  caloriesBurnedEl.innerHTML = `
  <h3>Calories Burned: ${total_calories} <img src="${weatherIcon}" alt="${data.weather[0].description}"></h3> 
  <h3>Activity Minutes: (${duration_minutes})
`; //using weather icon and alt description just as placeholder for now
}

//Set in local storage search history which should be an array consisting of name, start point, end point, calories burned, activity
function getCaloriesBurned(previousBurns) {
    searchHistory.push(previousBurns);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    updateBurnList();
  }

  function updateBurnList() {
    let searchHistoryStr = localStorage.getItem("searchHistory");
    if (searchHistoryStr) {
      searchHistory = JSON.parse(searchHistoryStr);
      let historyListHtml = "";
      for (let i = 0; i < searchHistory.length; i++) {
        historyListHtml += `<li>${searchHistory[i]}</li>`;
      }
      historyListEl.innerHTML = historyListHtml;
    }
  }
  
  // Initialize search history list when user refreshes page
  updateBurnList();

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

