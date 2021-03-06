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
    save.style = { display: "grid", placeItems: "center" };
    save.setAttribute("id", search.replaceAll(" ", "-"));
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
                        buildCurrentweather(first, data2, city);
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
let buildCurrentweather = function(data, data2, name2){
    let title = document.createElement("h2");
    let infoTemp = document.createElement("p");
    let infoWind = document.createElement("p")
    let infoHumid = document.createElement("p");
    let infoUv = document.createElement("p");
    let icon = document.createElement("img");
    let date = moment().format('L');
    let name = name2;
    title.textContent = name + " (" + date + ")" ;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    title.appendChild(icon);
    //title.setAttribute("class", data.weather.icon)
    currentWeather.appendChild(title);
    let temp = data.main.temp;
    infoTemp.textContent = "Temp: " + temp.toFixed(2) + "??F";
    currentWeather.appendChild(infoTemp);
    let windSpeed = data.wind.speed;
    infoWind.textContent = "Wind: " + windSpeed + " MPH";
    currentWeather.appendChild(infoWind);
    let humid = data.main.humidity;
    infoHumid.textContent = "Humidity: " + humid + " %";
    currentWeather.appendChild(infoHumid);
    let uv = data2.current.uvi;
    let span = document.createElement("span");
    span.textContent = uv;
    infoUv.textContent = "UV Index: ";
    if(uv < 3){
        span.classList = "bg-success  ";
    } else if (uv < 6){
        span.classList = "bg-secondary  ";
    } else if (uv < 8){
        span.classList = "bg-warning  ";
    } else {
        span.classList = "bg-warning  ";
    }
    infoUv.appendChild(span);
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
        container.classList = "col bg-info"
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
        temp.textContent = "Temp: " + data.daily[i].temp.day + "??F";
        container.appendChild(temp);
        wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"
        container.appendChild(wind);
        humid.textContent = "Humidity: " + data.daily[i].humidity + " %";
        container.appendChild(humid);
        holder.appendChild(container)
        days.appendChild(holder);
    }
}
let historyHander = function(e){
    console.log(e.target);
    var name = e.target.id;
    console.log(name);
    name = name.replaceAll("-", " ")
    currentWeather.innerHTML = "";
    days.innerHTML = "";
    console.log(name);
    getWeatherData(name);
}
saveEl.addEventListener("click", historyHander);
historyEl.addEventListener("submit", historyBuilder);