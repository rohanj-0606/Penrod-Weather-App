const appKey = "e864f94433a436afb7f1b0cef96179bc";

function findWeatherDetails() {
	createStructure();
	updateWeather();
	setInterval(updateWeather,60000);
	function updateWeather()
	{
		var cities = ["chicago", "milwaukee", "dallas", "minneapolis"];
		for (var i = 0; i < cities.length; i++) {
			let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[i] + "&appid=" + appKey;
			httpRequestAsync(searchLink, GetWeather, (i + 1));
		};
	}

	function createStructure()
	{
		for(i=1;i<5;i++)
		{
			$("#city"+i).append('<div id="temp'+i+'" class="slds-col temperature city-blk city-blk-mobile">' 
			+'</div>');
			$("#city"+i).append('<div id="humidity'+i+'" class="slds-col humidity city-blk city-blk-mobile">' 
			+'</div>');
			$("#city"+i).append('<div id="min-temp'+i+'" class="slds-col min_temp city-blk city-blk-mobile">' 
			+'</div>');
			$("#city"+i).append('<div id="max-temp'+i+'" class="slds-col max_temp city-blk city-blk-mobile">' 
			+'</div>');
		}
	}
}

function GetWeather(response, col) {
	let temperature = $("#col" + col).find("#temp"+col);
	let humidity = $("#col" + col).find("#humidity"+col);
	let min = $("#col" + col).find("#min-temp"+col);
	let max = $("#col" + col).find("#max-temp"+col);
	let jsonObject = JSON.parse(response);

	temperature.html("Temperature: " + parseInt(jsonObject.main.temp - 273) + "°C");
	humidity.html("Humidity: " + jsonObject.main.humidity + "%");
	min.html("Min Temperature: " + parseInt(jsonObject.main.temp_min - 273) + "°C");
	max.html("Max Temperature: " + parseInt(jsonObject.main.temp_max - 273) + "°C");
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