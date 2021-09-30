let historyEl = document.querySelector("#user-form");
let cityName = document.querySelector("#city");
let saveEl = document.querySelector("#history");
let currentWeather = document.querySelector("#current-weather");
let days = document.querySelector("#days");

let historyBuilder = function(event){
    event.preventDefault();
    currentWeather.innerHTML = "";
    days.innerHTML = "";
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
                    let data2;
                    let first = data;
                    console.log(first);
                    getOtherInfo(data).then(function(data){
                        console.log(data);
                        data2 = data;
                        buildCurrentweather(first, data2);
                        build5Day(data2);
                    })
                })
            } else {
                alert("Invalid City");
            }
        })
        .catch(function(error){
            alert("Unable to connect to Weather" + error);
        })
}
let getOtherInfo = function(data){
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat +"&lon="+ data.coord.lon +"&appid=a597667446d195fe657947f1689b4801&units=imperial ";
    return fetch(apiUrl)
            .then(function(response){
                if(response.ok){
                    return response.json();
                } else{
                    return undefined;
                }
            }) 
            .catch(function(error){
                alert("Unable to connect to Weather" + error);
            })
}
let buildCurrentweather = function(data, data2){
    let title = document.createElement("h2");
    let infoTemp = document.createElement("p");
    let infoWind = document.createElement("p")
    let infoHumid = document.createElement("p");
    let infoUv = document.createElement("p");
    let icon = document.createElement("img");
    let date = moment().format('L');
    let name = cityName.value;
    title.textContent = name + " (" + date + ")" ;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    title.appendChild(icon);
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
let build5Day = function(data){
    let header = document.createElement("h3")
    let holder = document.createElement("div")
    holder.classList = "row justify-space-between";
    header.textContent = "5-Day Forecast";
    days.appendChild(header);
    for(let i = 1; i < 6; i++){
        let container = document.createElement("div");
        container.classList = "col"
        let date = moment().add(i, "days");
        date = date.format("L");
        let title = document.createElement("h4");
        title.textContent =  date;
        container.appendChild(title);
        let icon = document.createElement("img");
        icon.setAttribute("scr", icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`))
        container.appendChild(icon);
        let temp = document.createElement("p");
        let wind = document.createElement("p");
        let humid = document.createElement("p");
        temp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
        container.appendChild(temp);
        wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"
        container.appendChild(wind);
        humid.textContent = "Humidity: " + data.daily[i].humidity + " %";
        container.appendChild(humid);
        holder.appendChild(container)
        days.appendChild(holder);
    }
}
historyEl.addEventListener("submit", historyBuilder);