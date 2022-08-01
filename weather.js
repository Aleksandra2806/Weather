const timeElement = document.querySelector(".time");
const dataElement = document.querySelector(".date");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search button");
const text = document.querySelector(".quote");
const author = document.querySelector(".author");
const btn = document.querySelector(".btn")
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

// data and time

function dataTime() {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn24HrFormat = hour >= 25 ? hour %24: hour
  const minutes = time.getMinutes();

  timeElement.innerHTML = (hoursIn24HrFormat < 10? '0' + hoursIn24HrFormat: hoursIn24HrFormat) + ':' + (minutes < 10? '0' + minutes: minutes);
  dataElement.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}

// weather

let weather = {
  fetchWeather: function (city) {
    fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=407e2e7c776ee6416329189d82e9f27b&units=metric")
    .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function displayWeather (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure, feels_like, temp_min, temp_max} = data.main;
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys;

    document.querySelector(".city").innerText = "Weather in " + name;
    
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    
    document.querySelector(".description").innerText = description;
    
    document.querySelector(".temp").innerText = Math.ceil(temp) + "°C";

    document.querySelector(".minMax").innerText = Math.floor(temp_min) +  "°C" + " (min)" + " " + "/" + " " + Math.ceil(temp_max) + "°C" + " (max)";
    
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";

    document.querySelector(".pressure").innerText = "Pressure: " + pressure + "hPa";
    
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
  
    document.querySelector(".sunrise").innerHTML = "Sunrise: " + new Date(sunrise * 1000).toTimeString().match(/^(\d{2}):(\d{2})/).slice(0, -2);
    
    document.querySelector(".sunset").innerHTML = "Sunset: " + new Date(sunset * 1000).toTimeString().match(/^(\d{2}):(\d{2})/).slice(0, -2);

    document.querySelector(".feels_like").innerHTML = "Feels like: " + Math.ceil(feels_like) + "°C";
    
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ")";
  },

  search: function () {
    this.fetchWeather(searchInput.value);
  },
}

searchBtn.addEventListener("click", function () {
  weather.search();
})

searchInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
})

dataTime();
weather.fetchWeather("Gomel");


// quote using promise

let getQuote = () => {
  fetch('https://type.fit/api/quotes')
  .then((response) => response.json())
  .then((data) => {
    const i = Math.floor(Math.random()*data.length);
    const item = data[i];
    text.innerText = item.text;
    author.innerText = item.author;
  })
  .catch(error => console.error(error))
  }

getQuote()
btn.addEventListener("click", getQuote);

// quote using async await

// const getQuote = async () => {
//   const response = await fetch("https://type.fit/api/quotes");
//   const quotes = await response.json();
//   const i = Math.floor(Math.random()*quotes.length);
//   const item = quotes[i];
//   text.innerText = item.text;
//   author.innerText = item.author;;
// }

