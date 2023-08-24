const API_KEY = config.weatherApiKey;   // api key

function onGeoOk(position) {    // 성공 시 user 위치 전달
    const lat = position.coords.latitude;   // 위도
    const lon = position.coords.longitude;   // 경도
    // url 가져오기 - API key, lat, lon 변수는 받드시 값이 있어야 함
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}4&lon=${lon}&appid=${API_KEY}&units=metric`
    
    fetch(url).then(response => response.json()).then(data => {     // url 얻어와서 내용 추출하고 data 얻기
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");

        city.innerText = data.name;   // data 중 name(지역)
        weather.innerText = `${data.weather[0].main} | ${data.main.temp}°C`;   // data 중 weather array의 첫번째 요소 main(날씨) / data 중 main의 temp(온도)
    });
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
