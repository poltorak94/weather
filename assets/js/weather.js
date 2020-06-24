; (function () {

    function getWeatherData(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8c93761f0cfd02f56a37c775dc01adf7`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                buildWeatherWidget(data);
            })
    }

    function buildWeatherWidget(weatherData) {

        let type = 'sunny';
        const cloud = weatherData.clouds.all;

        if (cloud > 30 && cloud < 60) {
            type = 'cloud-sun';
        } else if (cloud >= 60) {
            type = 'cloud'
        }

        if (weatherData.rain) {
            type = 'rain';
        }

        document.getElementById('weather-app').innerHTML = `
            <div class="weather-widget-place">
                <span>${weatherData.name}</span>
                <span>${weatherData.sys.country}</span>
            </div>
            <div class="weather-widget-main">
                <div class="weather-widget-main-temp">
                    ${ (weatherData.main.temp - 273).toFixed(0)}&deg;C
                </div>
                <div class="weather-widget-main-type ${type}">
                    <i></i>
                    <p></p>
                </div>
            </div>
            <div class="weather-widget-details">
                <div class="weather-widget-details-item">
                    <h4>Wind</h4>
                    ${weatherData.wind.speed}m/s <span style="display:inline-block; transform: rotate(${weatherData.wind.deg}deg)">&uarr;</span>
                </div>
                <div class="weather-widget-details-item">
                    <h4>Humidity</h4>
                    ${weatherData.main.humidity}%
                </div>
                <div class="weather-widget-details-item">
                    <h4>Pressuer</h4>
                    ${weatherData.main.grnd_level ? weatherData.main.grnd_level : weatherData.main.pressure}hPa
                </div>
            </div>
        `;

    }


    getWeatherData('Tokio');


    let selectBox = document.querySelector('.selectbox');
    selectBox.onchange = function () {
        let city = this.value;
        getWeatherData(city)
    };


})();