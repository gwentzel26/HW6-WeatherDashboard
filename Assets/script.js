var cityName = "Chicago";

var apiKey = "ae2375bc15cf157baedc57216574cc2c";
var searchBtn = document.querySelector('#searchBtn');
var cityName = document.querySelector('#userSearch');
var cityHeader = document.querySelector('#cityHeader');
// const oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
// 4, 12, 20, 28, 36

// searchBtn.addEventListener('click', displayCity);

searchBtn.addEventListener('click', saveInput);
cityHeader.value = localStorage.getItem('city');

function saveInput() 
    {
        localStorage.setItem("city", cityName.value);
        console.log(cityName);
       cityHeader = cityName.textContent;
    }
function displayCity() {
    cityHeader = cityName.textContent;
}


// function fiveDayCall() {
//     const fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=5&appid=" + apiKey;

//     fetch(fiveDayApi) 
//         .then(function (response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//         let day1 = data.list[4];
//         let day2 = data.list[12];
//         let day3 = data.list[20];
//         let day4 = data.list[28];
//         let day5 = data.list[36];

//         let obj = {
//             day1: day1,
//             day2: day2,
//             day3: day3,
//             day4: day4,
//             day5: day5
//         }
        
//         let lat = data.city.coord.lat;
//         let lon = data.city.coord.lon;
//         oneDayCall(lat, lon, obj);
// })
// }

// function oneDayCall(lat, lon, obj) {
//     const fiveDayData = obj;
//     console.log(fiveDayData);

//     const oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

//     fetch(oneCallApi) 
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//         var currentData = data.current;
//         console.log(currentData);
   
// })
// }

// fiveDayCall();

