
var cityName ;
var apiKey = "ae2375bc15cf157baedc57216574cc2c";
var searchBtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#userSearch');
var cityHeader = document.querySelector('#cityHeader');
var cityData = document.getElementById('todayCityData');
var forecast = document.getElementById('forecast');
var recentSearches = document.getElementById('recentSearches');
var fiveDayTitle = document.getElementById('fiveDayTitle');
var forecastDates = document.getElementById('forecastDates');
var clearHistory = document.getElementById('clearHistory');
var searchArr ;
var searchIndex ;

// event listener for the search button.  Saves user search in local storage and displays it as cityHeader, 
// then calls the next function
searchBtn.addEventListener('click', function() {
    localStorage.setItem("city", citySearch.value);
        console.log(citySearch);
    //    cityHeader.textContent = citySearch.value;
       cityName = citySearch.value;
    saveInput(cityName);
});
// cityHeader.textContent = localStorage.getItem('city');
var storedNames = JSON.parse(localStorage.getItem("names")); 
console.log(storedNames)
if (storedNames) {
    searchArr = [...storedNames];
    searchIndex = searchArr.length;
} else {
    searchArr = [];
    searchIndex = 0;
}
for (let i=0; i < searchArr.length; i++) {
    const searchHistory = document.getElementById("searchList");
    const searchLi = document.createElement("li");
    searchLi.setAttribute("class", "prevSearch");
    searchLi.textContent = `${searchArr[i]}`
    searchHistory.append(searchLi);
    recentSearches.appendChild(searchHistory);
}

var prevSearches = document.querySelectorAll(".prevSearch");
 for(let i=0; i < prevSearches.length; i++) {
        console.log(prevSearches[i]);
        prevSearches[i].addEventListener("click", function(event) {
           var searchText = event.target.textContent;
           cityName = searchText;
           console.log(cityName);
           cityData.innerHTML = ``;
           forecast.innerHTML = ``;
           cityData.append(cityHeader);
           forecast.append(fiveDayTitle);
           forecast.append(forecastDates);
           fiveDayCall();
        })
    }
 
function saveInput(cityName) 
    {
       searchArr.push(cityName);
       localStorage.setItem('names', JSON.stringify(searchArr)); 
    //    var storedNames = JSON.parse(localStorage.getItem("names")); 

      
            const searchHistory = document.getElementById("searchList");
            const searchLi = document.createElement("li");
            searchLi.textContent = `${searchArr[searchIndex]}`
            searchHistory.append(searchLi);
            recentSearches.appendChild(searchHistory);
            searchIndex++;
            
       cityData.innerHTML = ``;
       forecast.innerHTML = ``;
       cityData.append(cityHeader);
       forecast.append(fiveDayTitle);
       forecast.append(forecastDates);
       
       fiveDayCall();
    }

function fiveDayCall() {
    const fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

    fetch(fiveDayApi) 
        .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        let day1 = data.list[4];
        let day2 = data.list[12];
        let day3 = data.list[20];
        let day4 = data.list[28];
        let day5 = data.list[36];

        let fiveDayArr = [
             day1,
            day2,
             day3,
             day4,
             day5
        ]

        // for loop cycling through the fiveDayArr to generate day for five day forecast

        for (let i=0; i <fiveDayArr.length; i++) {
        const fiveCast = document.createElement("div");
        fiveCast.setAttribute("class", "forecast");
        
        // temperature code converts from Kelvin to farenheit and rounds to the nearest integer
        fiveCast.innerHTML =  `
        <h2 id="cityForecast">${cityName}</h2>
        <h3 id="forecastDay">Day ${i+1} </h3>
        <ul id="forecastList" >
            <li>Temperature: ${Math.round((fiveDayArr[i].main.temp - 273.15)*(9/5)+32)}°F</li>
            <li>Wind Speed: ${fiveDayArr[i].wind.speed}</li>
            <li>Humidity: ${fiveDayArr[i].main.humidity}%</li>
        </ul>`
       forecast.appendChild(fiveCast);


            // not working array replacement
       if (searchArr.length >1) {
           searchArr[searchArr.length -1].replace(searchArr[searchArr.length-2]);
       }
        }
        
        
        let lat = data.city.coord.lat;
        let lon = data.city.coord.lon;
        oneDayCall(lat, lon, fiveDayArr);
})
}

function oneDayCall(lat, lon, fiveDayArr) {
    
    console.log(fiveDayArr);

    const oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(oneCallApi) 
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        var currentData = data.current;
        console.log(currentData);
        // formatting the current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        // creating a div of current weather to append to the dom
        const currentDiv = document.createElement("div");
        currentDiv.setAttribute("class", "card");

        currentDiv.innerHTML =  `
        <h2 id="cityHeader">The weather in ${cityName} today is</h2>
        <h3 id="todayDate" >Date: ${today} </h3>
<ul id = currentList>
    <li>Temperature: ${Math.round((currentData.temp - 273.15)*(9/5)+32) }°F</li>
    <li>Wind Speed: ${currentData.wind_speed} MPH</li>
    <li>Humidity: ${currentData.humidity}%</li>
    <li id = "uvi">UV index: ${currentData.uvi} </li>
</ul>`
todayCityData.appendChild(currentDiv);
   
})
}

clearHistory.addEventListener('click', clearSearch);
function clearSearch() {
    localStorage.clear(); 
    location.reload();
}

fiveDayCall();
// saveInput();

