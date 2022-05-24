document.querySelector('#search').addEventListener("click",getPokemon);

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}
function getPokemon(e) {
    const name = document.querySelector("#pokemonName").value.toLowerCase();
	
	fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data.weight);
		console.log(data.name);
		console.log(data.sprites.other["official-artwork"].front_default);
		document.querySelector(".pokemonBox").innerHTML = `
		<div>
		<img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}"/>
		</div>
		<div class="pokemonInfo">
			<h1>${capitalizeFirstLetter(data.name)}</h1>
			<p>Weight: ${data.weight}</p>
		</div>
		`;
	})
	.catch((err) => {
		document.querySelector(".pokemonBox").innerHTML = `
<div>
<p>Could not find this Pokemon 😟. Try again.</p>
</div>`
	    console.log("Pokemon not found",err);
	});
	e.preventDefault();
}
