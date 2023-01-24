let long;
let lat;
let temperatureDescription=document.querySelector("temperature-description");
let temperatureDegree=document.querySelector(".temperature-degree");
let locationTimezone=document.querySelector(".location-Timezone");
let setIcon=document.querySelector(".icon");
let maxTemperature=document.querySelector(".maxTemp");
let minTemperature=document.querySelector(".minTemp");
let windSpeed=document.querySelector(".windSpeed");
let weather=document.querySelector("#weather");

weather.addEventListener("click",expandTab);

function expandTab(){
    if(!weather.classList.contains('expand'))
    {
        weather.classList.add('expand');
        setTimeout(()=>{
            weather.classList.remove('expand');
        },3000);
    }
    else{
        weather.classList.remove('expand');
    }
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position=>{
     long = position.coords.longitude;
     lat = position.coords.latitude;
     const data = await getWeatherdata(lat,long);

     var map=L.map('map').setView([20.9716,80.5946],5);

     L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=OdpemAaV0raJvYO6cUSS', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);

        var marker = L.marker([lat.long]).addTo(map);
        marker.bindPopup(date.name).openPopup();

        map.on('click',async function(e) {
            cosole.log("lat",lat,"long",long);
            const data = await getweatherdata(e.latlng.lat,e.latlng.lng);
            marker.setLatLng([e.latlng.lat,e.latlng.lng]);
            marker.bindpopup(data.name).openpopup();
        });
    })
}


function weatherDataHandler(data){
    const{ temp } = data.main;
    const{description}= data.weather[0];
    const{ icon } = data.weather[0];
    const{ temp_max } = data.main;
    const{ temp_min } = data.main;
    const{ speed } = data.wind;


    temperatureDegree.textContent=temp+'\xB0'+'C';
    temperatureDescription.textContent.description=description;
    locationTimezone.textContent=data.name;
    maxTemperature.textContent='Max: '+temp_max+'\xB0'+'C';
    minTemperature.textContent='Min: '+temp_min+'\xB0'+'C';
    windspeed.textContent= 'Wind speed: '+speed+'m/s';
    setIcon.style["background-image"] = 'url(${setIconFunction(icon)})';

  
    }

    async function getWeatherdata(lat,long) {
        const api = 'https://api.openweathermap.org/data/2.5/weather?lat=$%7Blat%7D&lon=$%7Blong%7D&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e';

        let response=await fetch(api);
        let data=await response.json();


        WeatherDataHandler(data);
        return data;

}

function setIconFunction(icon) {

    const icons = {
        "01d": "./animated/day.svg",
        "02d": "./animated/cloudy-day-1.svg",
        "03d": "./animated/cloudy-day-2.svg",
        "04d": "./animated/cloudy-day-3.svg",
        "09d": "./animated/rainy-1.svg",
        "10d": "./animated/rainy-2.svg",
        "11d": "./animated/rainy-3.svg",
        "13d": "./animated/snowy-6.svg",
        "50d": "./animated/mist.svg",
        "01n": "./animated/night.svg",
        "02n": "./animated/cloudy-night-1.svg",
        "03n": "./animated/cloudy-night-2.svg",
        "04n": "./animated/cloudy-night-3.svg",
        "09n": "./animated/rainy-1.svg",
        "10n": "./animated/rainy-2.svg",
        "11n": "./animated/rainy-3.svg",
        "13n": "./animated/snowy-6.svg",
        "50n": "./animated/mist.svg"
    };

}