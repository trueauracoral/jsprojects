//Some code created with help from  https://invidio.xamh.de/watch?v=zOrejGF0oBA
document.querySelector('#search').addEventListener("click",getPokemon);

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getPokemon(e) {
    const name = document.querySelector("#pokemonName").value.toLowerCase();
	
	fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
	.then((response) => response.json())
	.then((data) => {
		typetext = capitalizeFirstLetter(data.types[0].type.name);
		if (1 in data.types) {
			typetext = typetext+", "+capitalizeFirstLetter(data.types[1].type.name);
		}
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
		.then((response) => response.json())
		.then((data2) => {
			evolution_chain_link = data2.evolution_chain.url;
		fetch(evolution_chain_link)
		.then((response) => response.json())
		.then((data3) => {
			if (0 in data3.chain.evolves_to){
				evolvetext = capitalizeFirstLetter(name)+" evolves to "+capitalizeFirstLetter(data3.chain.evolves_to[0].species.name);
				if (data3.chain.evolves_to[0].species.name == name){
					evolvetext = capitalizeFirstLetter(name)+" evolves to "+capitalizeFirstLetter(data3.chain.evolves_to[0].evolves_to[0].species.name);
				}else if (data3.chain.evolves_to[0].evolves_to[0].species.name == name){
					evolvetext = capitalizeFirstLetter(name)+" is the final form of "+capitalizeFirstLetter(data3.chain.species.name);
				}
			}
			else{
				evolvetext = capitalizeFirstLetter(name)+" does not evolve";
			}
		document.querySelector(".pokemonBox").innerHTML = `
		<div>
		<img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}"/>
		</div>
		<div class="pokemonInfo">
			<h1>${capitalizeFirstLetter(data.name)}</h1>
			<p><b>Type:</b> ${typetext}</p>
			<p><b>Weight:</b> ${data.weight}</p>
			<p><b>Height:</b> ${data.height}</p>
			<p>${evolvetext}</p>
		</div>
		`;
	});
	});
	})
	.catch((err) => {
		document.querySelector(".pokemonBox").innerHTML = `
<div>
<p>Could not find this Pokemon 😟. Try again.</p>
</div>`;
	    console.log("Pokemon not found",err);
	});
	e.preventDefault();
}
