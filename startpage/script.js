"use strict";
// global constants
const pokedex = "https://www.pokemon.com/us/api/pokedex/";

const castforms = {
	"sunny": "https://archives.bulbagarden.net/media/upload/thumb/9/90/0351Castform-Sunny.png/120px-0351Castform-Sunny.png",
	"snowy": "https://archives.bulbagarden.net/media/upload/thumb/3/34/0351Castform-Snowy.png/120px-0351Castform-Snowy.png",
	"rainy": "https://archives.bulbagarden.net/media/upload/thumb/a/ab/0351Castform-Rainy.png/120px-0351Castform-Rainy.png",
	"normal": "https://archives.bulbagarden.net/media/upload/thumb/f/ff/0351Castform.png/120px-0351Castform.png"
};

const phases = {
	"New Moon": "🌑",
	"Waxing Crescent": "🌒",
	"First Quarter": "🌓",
	"Waxing Gibbous": "🌔",
	"Full Moon": "🌕",
	"Waning Gibbous": "🌖",
	"Last Quarter": "🌗",
	"Waning Crescent": "🌘",
};

// GEO location
let latlon = "";
navigator.geolocation.getCurrentPosition((position) => {
	console.log(position);
	latlon = `${position.coords.latitude},${position.coords.longitude}`;
}, (error) => console.error(error));

async function updateWeatherInfo() {
	const response = await fetch(`https://wttr.in/${latlon}?format=j1`);
	if (response.ok) {
		const weatherJson = await response.json();
		const description = weatherJson.current_condition[0].weatherDesc[0].value.toLowerCase();
		console.log(description)

		let form = "";
		if (description.includes("sun")) {
			form = "sunny";
		} else if (description.includes("cold")) {
			form = "snowy";
		} else if (description.includes("rain")) {
			form = "rainy";
		} else {
			form = "normal"
		}

		console.log(form);
		document.querySelector(".weather").innerHTML = `<img src="${castforms[form]}">`;
		const moonPhase = weatherJson.weather[0].astronomy[0].moon_phase;
		console.log(moonPhase);
		document.querySelector(".phase").innerHTML = `<p>${phases[moonPhase]} ${moonPhase}</p>`;
	} else {
		document.querySelector(".info").innerHTML = `
			<div>
			<p>Could not find this 😟. Try again.</p>
			</div>`;

		console.error(response.body);
	}
}

async function updateRandomPokemonEntry() {
	const response = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(pokedex));
	if (response.ok) {
		const pokedexJson = await response.json();
		const value = pokedexJson[Math.floor(Math.random() * Object.keys(pokedexJson).length)];
		console.log(value)
		document.querySelector(".image").innerHTML = `<img src="${value["ThumbnailImage"]}">`;
		document.querySelector(".info").innerHTML = `
				<p><b>Number</b>: #${value["number"]}</p>
				<p><b>Name</b>: ${value["name"]}</p>
				<p><b>Type</b>: ${value["type"].join(", ")}</p>
				<p><b>Link</b>: <a href="https://pokemon.com${value["detailPageURL"]}">https://pokemon.com${value["detailPageURL"]}</a>
		`;
	} else {
		document.querySelector(".info").innerHTML = `
			<div>
			<p>Could not find this 😟. Try again.</p>
			</div>
		`;
		console.error(response.body);
	}
}

(async function() {
	await updateWeatherInfo();
	await updateRandomPokemonEntry();
})()

