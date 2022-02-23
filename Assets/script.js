var cityName ;

var apiKey = "ae2375bc15cf157baedc57216574cc2c";
var searchBtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#userSearch');
var cityHeader = document.querySelector('#cityHeader');
var cityData = document.getElementById('todayCityData');

const data = [{
    date: "02/22/22",
    temperature: 74,
    humidity: 50,
    windspeed: 277,
    uvi: .5
}]



// for (let i=0; i <data.length; i++) {
// // const newCard = document.createElement("div");
// // newCard.setAttribute("class", "card");

// // newCard.innerHTML =  `<h3>Date: ${data[i].date} </h3>
// // <ul>
// //     <li>UV index: ${data[i].uvi}</li>
// //     <li>Wind Speed: ${data[i].windspeed}</li>
// //     <li>Temperature: ${data[i].temperature}</li>
// //     <li>Humidity: ${data[i].humidity} %</li>
// // </ul>`
// // todayCityData.appendChild(newCard);
// }



// const oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
// 4, 12, 20, 28, 36

// searchBtn.addEventListener('click', displayCity);

searchBtn.addEventListener('click', saveInput);
cityHeader.textContent = localStorage.getItem('city');

function saveInput() 
    {
        localStorage.setItem("city", citySearch.value);
        console.log(citySearch);
       cityHeader.textContent = citySearch.value;
       cityName = citySearch.value;
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
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
        const currentDiv = document.createElement("div");
        currentDiv.setAttribute("class", "card");

        currentDiv.innerHTML =  `<h3 id="todayDate" >Date: ${today} </h3>
<ul id = currentList>
    <li>Temperature: ${Math.round((currentData.temp - 273.15)*(9/5)+32) } °F</li>
    <li>Wind Speed: ${currentData.wind_speed} MPH</li>
    <li>Humidity: ${currentData.humidity} %</li>
    <li id = "uvi">UV index: ${currentData.uvi} </li>
</ul>`
todayCityData.appendChild(currentDiv);
   
})
}

fiveDayCall();

