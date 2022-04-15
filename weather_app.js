const btn = document.querySelector(".convert");


function convert() {

  let bla = document.getElementById("temperatureData").textContent.split(" ")[document.getElementById("temperatureData").textContent.split(" ").length - 1]

  if (bla == "F") {
    let z = document.getElementById("temperatureData").textContent.split(" ")[0];
    let a = Math.round(10 * ((z - 32) * 5 / 9)) / 10;
    const b = `${a} C`;
    document.getElementById("temperatureData").textContent = `${b}`;
    console.log(document.getElementById("temperatureData").textContent = b);

  } else if (bla == "C") {
    let x = document.getElementById("temperatureData").textContent.split(" ")[0];
    let y = Math.round(10 * ((x * 1.8) + 32)) / 10;
    let F = `${y} F`
    document.getElementById("temperatureData").textContent = F;
    console.log(document.getElementById("temperatureData").textContent)

  }

}
const btnF = document.querySelector(".convertFeel");


function convertFeels() {
  let bla = document.getElementById("feelsLikeData").textContent.split(" ")[document.getElementById("feelsLikeData").textContent.split(" ").length - 1]

  if (bla == "F") {
    let z = document.getElementById("feelsLikeData").textContent.split(" ")[0];
    let a = Math.round(10 * ((z - 32) * 5 / 9)) / 10;
    const b = `${a} C`;
    document.getElementById("feelsLikeData").textContent = `${b}`;
    console.log(document.getElementById("feelsLikeData").textContent = b);

  } else if (bla == "C") {
    let x = document.getElementById("feelsLikeData").textContent.split(" ")[0];
    let y = Math.round(10 * ((x * 1.8) + 32)) / 10;
    let F = `${y} F`
    document.getElementById("feelsLikeData").textContent = F;
    console.log(document.getElementById("feelsLikeData").textContent)

  }

}
const btnK = document.querySelector(".convertKm");

function convertKm() {
  let bla = document.querySelector(".K").textContent.split(" ")[document.querySelector(".K").textContent.split(" ").length - 1]

  if (bla == "km/h") {
    let z = document.querySelector(".K").textContent.split(" ")[0];
    let a = Math.round(10 * (z / 1.609344)) / 10;
    const b = `${a} miles/h`;
    document.querySelector(".K").textContent = `${b}`;
    console.log(document.querySelector(".K").textContent = b);

  } else if (bla == "miles/h") {
    let x = document.querySelector(".K").textContent.split(" ")[0];
    let y = Math.round(10 * (x * 1.609344)) / 10;
    let F = `${y} km/h`
    document.querySelector(".K").textContent = F;
    console.log(document.querySelector(".K").textContent)

  }

}



btnK.addEventListener("click", convertKm);
btnF.addEventListener("click", convertFeels)
btn.addEventListener("click", convert);

//Button that gets api info
const btns = document.getElementById("btn");

btns.addEventListener("click", change);

function change() {

  let search = document.getElementById("search").value;

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + search + ',&APPID=3306ebfa3212bf7b92e231e31cbfe306&units=metric', { mode: 'cors' })
    .then(function (response) {
      return response.json();

    })
    .then(function (response) {

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&exclude=minutely&appid=3306ebfa3212bf7b92e231e31cbfe306&units=metric', { mode: 'cors' })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {

          let weatherDescription = response.current.weather[0].description;
          let weather = document.getElementById("weatherDescription");
          weather.textContent = weatherDescription;

          console.log(weatherDescription);

          let temperatureData = response.current.temp;
          let temperature = document.getElementById("temperatureData");
          temperature.textContent = `${temperatureData}  C`;

          let feelsLike = response.current.feels_like;
          let feelsLikeData = document.getElementById("feelsLikeData");
          feelsLikeData.textContent = `${feelsLike} C`;

          console.log(feelsLike);



          let wind = response.current.wind_speed;
          console.log(wind);
          let windUnit = wind * 3.6;
          let windUnitRounded = Math.round(10 * windUnit) / 10;
          let windData = document.getElementById("windData");
          windData.textContent = `${windUnitRounded} km/h`;

          let humidity = response.current.humidity;
          console.log(humidity);

          let rain = response.hourly[0].pop;
          let rainData = document.getElementById("rainData");
          rainData.textContent = rain * 100;

          let date = new Date(response.current.dt * 1000);
          let dateTimeData = document.getElementById("dateTimeData");
          dateTimeData.textContent = date.toString();

          console.log(response.current.weather[0].main);
          console.log(response.current.temp);

          function toggleBtns() {
            const btns = document.querySelectorAll(".hide")
            btns.forEach(btn => {
              btn.classList.remove('hide')
            })
          }
          toggleBtns();
          let weatherMain = response.current.weather[0].main;


          fetch('https://api.giphy.com/v1/gifs/translate?api_key=WiJMmFWVtpn3rFw3Irj2fUDat4U4xFI1&s=' + weatherMain, { mode: 'cors' })
            .then(function (response) {
              return response.json();

            })
            .then(function (response) {
              const img = document.getElementById('weath');
              img.src = response.data.images.original.url;


            })


        })

    })

}





