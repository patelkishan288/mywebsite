let weather = {
    apiKey: "19f763af0bfcd6c24d7364ed4c1b199a",
    getWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey)
        .then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
        .then((data) => this.showWeather(data));
    },
    showWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity, feels_like}=data.main;
        const {speed}=data.wind; 
        console.log(name, icon, description, temp, humidity, feels_like,speed);
        document.querySelector(".welcomeMess").innerText = "Welcome to " + name;
        document.querySelector(".temp").innerText = "Weather: "+ temp + "F°";
        document.querySelector(".feelLike").innerText = "Feels like: "+ feels_like + "F°";
        document.querySelector(".skies").innerText = description;
        document.querySelector(".wind").innerText = "Wind: "+ speed +" MPH";
        document.querySelector(".humidity").innerText = "Humidity: "+ humidity+"%";
    },
    search: function () {
        this.getWeather(document.querySelector(".searchBar").value);
        future.getFuture(document.querySelector(".searchBar").value);
	},
};

let future = {
    apiKey: "d5fe06536dab93e135e3dd082bc75268",
    getFuture: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="
		+city+"&units=imperial&appid="
		+this.apiKey)
        .then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.then((data) => this.showFuture(data));
    },
	showFuture: function(data) {
        const forecastData  = [];
        for(let i = 6; i < 39; i = i+8) {
            let {temp, humidity, feels_like}=data.list[i].main;
            let {dt_txt} = data.list[i];
		    let {speed} = data.list[i].wind;
		    let {description} = data.list[i].weather[0];
            forecastData.push(dt_txt);
            forecastData.push(temp);
            forecastData.push(feels_like);
            forecastData.push(description);
            forecastData.push(speed);
            forecastData.push(humidity);
    }
        console.log(forecastData);
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d1 = new Date(forecastData[0]);
        const d2 = new Date(forecastData[6]);
        const d3 = new Date(forecastData[12]);
        const d4 = new Date(forecastData[18]);
        let day1 = weekday[d1.getDay()];
        document.querySelector(".date1").innerText = "Day: "+day1;
        document.querySelector(".temp1").innerText = "Temperature: "+ forecastData[1]+ "F°";
		document.querySelector(".feelLike1").innerText = "Feels like: "+ forecastData[2]+ "F°";
		document.querySelector(".skies1").innerText = forecastData[3];
		document.querySelector(".wind1").innerText = "Wind: "+ forecastData[4] +" MPH";
		document.querySelector(".humidity1").innerText = "Humidity: "+ forecastData[5]+"%";

        let day2 = weekday[d2.getDay()];
        document.querySelector(".date2").innerText = "Day: "+day2;
        document.querySelector(".temp2").innerText = "Temperature: "+ forecastData[7]+ "F°";
		document.querySelector(".feelLike2").innerText = "Feels like: "+ forecastData[8]+ "F°";
		document.querySelector(".skies2").innerText = forecastData[9];
		document.querySelector(".wind2").innerText = "Wind: "+ forecastData[10] +" MPH";
		document.querySelector(".humidity2").innerText = "Humidity: "+ forecastData[11]+"%";

        let day3 = weekday[d3.getDay()];
        document.querySelector(".date3").innerText = "Day: "+day3;
        document.querySelector(".temp3").innerText = "Temperature: "+ forecastData[13]+ "F°";
		document.querySelector(".feelLike3").innerText = "Feels like: "+ forecastData[14]+ "F°";
		document.querySelector(".skies3").innerText = forecastData[15];
		document.querySelector(".wind3").innerText = "Wind: "+ forecastData[16] +" MPH";
		document.querySelector(".humidity3").innerText = "Humidity: "+ forecastData[17]+"%";

        let day4 = weekday[d4.getDay()];
        document.querySelector(".date4").innerText = "Day: "+day4;
        document.querySelector(".temp4").innerText = "Temperature: "+ forecastData[19]+ "F°";
		document.querySelector(".feelLike4").innerText = "Feels like: "+ forecastData[20]+ "F°";
		document.querySelector(".skies4").innerText = forecastData[21];
		document.querySelector(".wind4").innerText = "Wind: "+ forecastData[22] +" MPH";
		document.querySelector(".humidity4").innerText = "Humidity: "+ forecastData[23]+"%";
    }
};

const btn = document.querySelector(".search button");
if (btn){
    btn.addEventListener("click", function () {
        weather.search();
      });
}

const search = document.querySelector(".searchBar");
if (search){
    search.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
          weather.search();
        }
    });
}