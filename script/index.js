const appKey = "e864f94433a436afb7f1b0cef96179bc";

function findWeatherDetails() {
	var cities = ["chicago", "milwaukee", "dallas", "minneapolis"];
	for (var i = 0; i < cities.length; i++) {
		let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[i] + "&appid=" + appKey;
		httpRequestAsync(searchLink, GetWeather, "col" + (i + 1));
	};
}

function GetWeather(response, col) {
	let temperature = document.getElementById(col).getElementsByClassName("temperature")[0];
	let humidity = document.getElementById(col).getElementsByClassName("humidity")[0];
	let min = document.getElementById(col).getElementsByClassName("min_temp")[0];
	let max = document.getElementById(col).getElementsByClassName("max_temp")[0];
	let jsonObject = JSON.parse(response);

	temperature.innerHTML = "<div id='temp' class='city-data'>" + "Temperature: " + parseInt(jsonObject.main.temp - 273) + "°C" + "</div>";
	humidity.innerHTML = "<div id='humidity-div' class='city-data'>" + "Humidity: " + jsonObject.main.humidity + "%" + "</div>";
	min.innerHTML = "<div class='data-width city-data' id='min_temp-div'>" + "Min Temperature: " + parseInt(jsonObject.main.temp_min - 273) + "°C" + "</div>";
	max.innerHTML = "<div class='data-width city-data' id='max_temp-div'>" + "Max Temperature: " + parseInt(jsonObject.main.temp_max - 273) + "°C" + "</div>";
}

function httpRequestAsync(url, callback, col) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = () => {
		if (httpRequest.readyState == 4 && httpRequest.status == 200)
			callback(httpRequest.responseText, col);
	}
	httpRequest.open("GET", url, true); // true for asynchronous 
	httpRequest.send();
}