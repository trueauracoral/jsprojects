// global variables
const pokedex = "https://www.pokemon.com/us/api/pokedex/"
const castforms = {
	"sunny": "https://archives.bulbagarden.net/media/upload/thumb/9/90/0351Castform-Sunny.png/120px-0351Castform-Sunny.png",
	"snowy": "https://archives.bulbagarden.net/media/upload/thumb/3/34/0351Castform-Snowy.png/120px-0351Castform-Snowy.png",
	"rainy": "https://archives.bulbagarden.net/media/upload/thumb/a/ab/0351Castform-Rainy.png/120px-0351Castform-Rainy.png",
	"normal": "https://archives.bulbagarden.net/media/upload/thumb/f/ff/0351Castform.png/120px-0351Castform.png"
}
const phases = {
    "New Moon": "🌑",
    "Waxing Crescent": "🌒",
    "First Quarter": "🌓",
    "Waxing Gibbous": "🌔",
    "Full Moon": "🌕",
    "Waning Gibbous": "🌖",
    "Last Quarter": "🌗",
    "Waning Crescent": "🌘",
}
var latlon = "";

// GEO location
function successCallback(position) {
  console.log(position);
  latlon = `${position.coords.latitude},${position.coords.longitude}`;
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

fetch(`https://wttr.in/${latlon}?format=j1`)
.then((response) => response.json())
.then((data) => {
    var description = data.current_condition[0].weatherDesc[0].value.toLowerCase();
    console.log(description)
    var form = "";
    if (description.includes("sun")) {
	    form = "sunny";
    } else if (description.includes("cold")) {
	    form = "snowy";
    } else if (description.includes("rain")) {
	    form = "rainy";
    } else {
	    form = "normal"
    }
    console.log(form)
    document.querySelector(".weather").innerHTML = `<img src="${castforms[form]}">`;
    moonPhase = data.weather[0].astronomy[0].moon_phase;
    console.log(moonPhase);
    document.querySelector(".phase").innerHTML = `<p>${phases[moonPhase]} ${moonPhase}</p>`;
})
.catch((err) => {
	document.querySelector(".info").innerHTML = `
<div>
<p>Could not find this 😟. Try again.</p>
</div>`;
	    console.log(err);
});

fetch("https://api.allorigins.win/raw?url="+encodeURIComponent(pokedex))
.then((response) => response.json())
.then((data) => {
	const value = data[Math.floor(Math.random() * Object.keys(data).length)];
	console.log(value)
	document.querySelector(".image").innerHTML = `<img src="${value["ThumbnailImage"]}">`;
	document.querySelector(".info").innerHTML = `
<p><b>Number</b>: #${value["number"]}</p>
<p><b>Name</b>: ${value["name"]}</p>
<p><b>Type</b>: ${value["type"].join(", ")}</p>
<p><b>Link</b>: <a href="https://pokemon.com${value["detailPageURL"]}">https://pokemon.com${value["detailPageURL"]}</a>
`;
})
.catch((err) => {
	document.querySelector(".info").innerHTML = `
<div>
<p>Could not find this 😟. Try again.</p>
</div>`;
	    console.log(err);
});
