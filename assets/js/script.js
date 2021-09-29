let historyEl = document.querySelector("#user-form");
let cityName = document.querySelector("#city");
let saveEl = document.querySelector("#history");

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
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={"+ city + "}&appid={61e05e48054a2c829719753e2dc4717b}";
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json(function(data){
                    console.log(data);
                })
            } else {
                alert("Invalid City");
            }
        })
        .catch(function(error){
            alert("Unable to connect to Weather");
        })
}
historyEl.addEventListener("submit", historyBuilder);