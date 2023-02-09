const apiKey = "2927e1e08ffc30adbea6e68287d2d093"; 
const apiCountry = ("https://flagsapi.com/") ;

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search");

const cityElement = document.getElementById("city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");
const countryElement = document.getElementById("country");
const humiditylement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.getElementById("weather-data")

const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data);
    //debug

    return data;
}

const showWeatherData = async (city)=> {
   const data = await getWeatherData(city);

   cityElement.innerText = data.name;
   tempElement.innerText = parseInt(data.main.temp);
   descElement.innerText =  data.weather[0].description;
   weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
   countryElement.setAttribute("src", `${apiCountry}${data.sys.country}/flat/24.png`);
   humiditylement.innerText = `${data.main.humidity}%`;
   windElement.innerText = `${data.wind.speed}km/h`;

   weatherContainer.classList.remove("hide");
   //ultimo comando remove a classe hide
}


searchBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e)=>{
    //função para usar o enter para envio de informação
    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    }
})
