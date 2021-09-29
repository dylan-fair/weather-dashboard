let historyEl = document.querySelector("#user-form");
let cityName = document.querySelector("#city");
let saveEl = document.querySelector("#history");
let currentWeather = document.querySelector("#current-weather");

let historyBuilder = function(event){
    event.preventDefault();
    let search = cityName.value;
    let save = document.createElement("button");
    save.textContent = search;
    save.classList = "list-item row justify-space-between align-center";
    save.setAttribute("id", search);
    saveEl.appendChild(save);
    getWeatherData(search);
}
let getWeatherData = function(city){
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=a597667446d195fe657947f1689b4801&units=imperial";
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    let data2 = getOtherInfo(data);
                    buildCurrentweather(data, data2);
                })
            } else {
                alert("Invalid City");
            }
        })
        .catch(function(error){
            alert("Unable to connect to Weather");
        })
}
let getOtherInfo = function(data){
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat +"&lon="+ data.coord.lon +"&appid=a597667446d195fe657947f1689b4801&units=imperial ";
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(data);
                    return data;
                })
            } else{
                alert("Invalid City");
            }
        })
        .catch(function(error){
            alert("Unable to connect to Weather");
        })
}
let buildCurrentweather = function(data, data2){
    let title = document.createElement("h2");
    let infoTemp = document.createElement("p");
    let infoWind = document.createElement("p")
    let infoHumid = document.createElement("p");
    let infoUv = document.createElement("p");
    let date = moment().format('L');
    let name = cityName.value;
    title.textContent = name + " (" + date + ")";
    //title.setAttribute("class", data.weather.icon)
    currentWeather.appendChild(title);
    let temp = data.main.temp;
    infoTemp.textContent = "Temp: " + temp.toFixed(2) + "°F";
    currentWeather.appendChild(infoTemp);
    let windSpeed = data.wind.speed;
    infoWind.textContent = "Wind: " + windSpeed + " MPH";
    currentWeather.appendChild(infoWind);
    let humid = data.main.humidity;
    infoHumid.textContent = "Humidity: " + humid + " %";
    currentWeather.appendChild(infoHumid);
    let uv = data2.daily[0].uvi;
    infoUv.textContent = "UV Index: " + uv;
    currentWeather.appendChild(infoUv);

}
historyEl.addEventListener("submit", historyBuilder);