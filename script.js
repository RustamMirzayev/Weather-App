window.addEventListener("DOMContentLoaded", () => {
  const api = {
    key: "211c15a4794795a2ea705a8db891fe6f",
    baseurl: "https://api.openweathermap.org/data/2.5/",
  };

  const searchbox = document.querySelector("input");

  function setQuery(e) {
    if (e.keyCode === 13) {
      getResults(searchbox.value);
    }
  }

  function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displaResult);

    searchbox.value = "";
  }

  function displaResult(weather) {
    let city = document.querySelector(".location .city");
    city.textContent = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.textContent = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.textContent = `${Math.round(weather.main.temp)}°C`;

    let waetherE1 = document.querySelector(".weather");
    waetherE1.textContent = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.textContent = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C`;
  }

  function dateBuilder(r) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "Jule",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[r.getDay()];
    let date = r.getDate();
    let month = months[r.getMonth()];
    let year = r.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  searchbox.addEventListener("keypress", setQuery);
});
