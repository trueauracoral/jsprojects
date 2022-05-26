//Some code created with help from  https://invidio.xamh.de/watch?v=zOrejGF0oBA
document.querySelector('#search').addEventListener("click",getSearchResults);

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getSearchResults(e) {
    const name = document.querySelector("#searchInput").value.toLowerCase();
	const librex_instance = "https://search.davidovski.xyz/"
	fetch(librex_instance+"api.php?q="+name+"&p=1&type=0")
	.then((response) => response.json())
	.then((data) => {
			let list = `
			
			`;
		data.forEach(function(result){
			list += `
		<div class="searchResultInfo">
			<p style="color:#ADADAD">${result.base_url}</p>
			<a href="${result.url}"><h2>${result.title}</h2></a>
			<p>${result.description}</p>
		</div>
		`;
		})
		document.querySelector(".searchResult").innerHTML = list
	})
	.catch((err) => {
		document.querySelector(".searchResult").innerHTML = `
<div>
<p>Could not find this 😟. Try again.</p>
</div>`;
	    console.log(err);
	});
	e.preventDefault();
}
