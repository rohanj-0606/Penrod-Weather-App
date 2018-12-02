const appKey = "e864f94433a436afb7f1b0cef96179bc";

function findWeatherDetails() {
	var cities = ["chicago", "milwaukee", "dallas", "minneapolis"];
	for (var i = 0; i < cities.length; i++) {
		let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[i] + "&appid=" + appKey;
		httpRequestAsync(searchLink, GetWeather, (i + 1));
	};
}

function GetWeather(response, col) {
	let temperature = $("#col" + col).find(".temperature");
	let humidity = $("#col" + col).find(".humidity");
	let min = $("#col" + col).find(".min_temp");
	let max = $("#col" + col).find(".max_temp");
	let jsonObject = JSON.parse(response);

	temperature.html("<div id='temp' class='city-data'>" + "Temperature: " + parseInt(jsonObject.main.temp - 273) + "°C" + "</div>");
	humidity.html("<div id='humidity-div' class='city-data'>" + "Humidity: " + jsonObject.main.humidity + "%" + "</div>");
	min.html("<div class='data-width city-data' id='min_temp-div'>" + "Min Temperature: " + parseInt(jsonObject.main.temp_min - 273) + "°C" + "</div>");
	max.html("<div class='data-width city-data' id='max_temp-div'>" + "Max Temperature: " + parseInt(jsonObject.main.temp_max - 273) + "°C" + "</div>");
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