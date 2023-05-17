# GeoBurn

## Description

This webpage was built to assist the user in dertermining how many calories a specific route will burn. This site is meant for to be used only for the activities, walking and biking. This will give the user the ability to plan more effectively rather than having that info after the walk or bike ride is complete. When builing this site we utilized local storage, Geoapify API and Calorie Burned API via API Ninjas.  GeoApify was used to gather the longitude and latitude from the starting and end points given by the user.  Then called on again to gather the duration time of the route based on the activity chosen.  Then the Calories Burned API was called to tell us how many calories are burned doing X activity for X amount of minutes.  We also used the CSS library, Materialize.  

## Technologies Used 
Ninjas API - https://api-ninjas.com/api/caloriesburned
GeoApify - https://apidocs.geoapify.com/
Materialize - https://materializecss.com/

## Installation

GeoBurn URL: 

## Usage

The user will load the webpage and complete the form.  The form includes the users name, weight, activiy choice, starting point, and ending point.  These paramaters are used when calling the two APIs to eventually give the user the total calories expected to burn on their planned walk or bike ride.  Once the form is completed again and submitted the original information about the burn will display under "Previous Burns".  The page will save a max of 10 previous burns.  

**  add screenshot  **


## Credits

Mallorie Pinto
Gene Suhir
Francisco Verdugo Del Real

## License

No License 

## Future Development

1. Add a weather API to display the weather for the users route 
2. Have the ability to avoid major highways and tunnels on your route
3. The user tells us how many calories they want to burn and GeoBurn gives them a walking and biking route. (Reverse)
4. The user is able to sort the previous burn columns. 
5. Add a resturant API.  The user will get their route information and then will be asked if they would like to see resturants on that route.  It they select yes, they can pick a resturant and menu item.  The API will give us the total calories for thier expected order and then offer a new or alternative route to walk/bike off the amount of calories in that meal.  
6. Take into account the elevation


