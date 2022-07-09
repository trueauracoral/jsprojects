function title(stuff){
    var title = `${stuff.name} ${stuff.now} No.${stuff.no}`;
    //if (stuff.includes("sub")){
    //    title = `${stuff.sub} | ${title}`;
    //}
    return title;
}

const board = "g";

fetch(`https://cors-anywhere.herokuapp.com/https://a.4cdn.org/${board}/catalog.json`)
.then((response) => response.json())
.then((data) => {
    console.log(data[0].threads)
	let list = `

	`;
	data[0].threads.forEach(function(result){
		list += `
	<hr>
	<img style='vertical-align:middle;' src="https://i.4cdn.org/${board}/${result.tim}${result.ext}" alt="${result.no}"/>
	<div style='vertical-align:middle; display:inline-block;'class="pokemonInfo">
	<div class="Thread">
		<p style="color:#ADADAD">${title(result)}</p>
		<p>${result.com}</p>
	</div>
	`;
	    if (result.replies != 0) {
	    result.last_replies.forEach(function(reply){
		list += `
	<div class="Reply">
	<p style="color:#ADADAD">>>${title(reply)}</p>
	<p>${reply.com}</p>
	`;
	    })
	    }
	});
    document.querySelector(".threads").innerHTML = list;
})
.catch((err) => {
	document.querySelector(".threads").innerHTML = `
<div>
<p>Could not find this 😟. Try again.</p>
</div>`;
    console.log(err);
});
