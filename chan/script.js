function title(stuff) {
    var title = `<span style="color:#D48D3D">${stuff.name}</span> ${stuff.now} No.${stuff.no}`;
    if (stuff.hasOwnProperty("sub")) {
        title = `${stuff.sub} | ${title}`;
    }
    return title;
}

const board = "vp";
boardButtons()
function boardButtons() {
    fetch(`https://api.allorigins.win/get?url=https://a.4cdn.org/boards.json`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        data = JSON.parse(data.contents)
        let list = `<p>[ `
        data.boards.forEach(function (result) {
            list += `<a onclick="getBoard('${result.board}')" href="#">${result.board}</a> `
        })
        document.querySelector(".boards").innerHTML = list + "]</p>"
    })
    .catch((err) => {
        document.querySelector(".threads").innerHTML = `
<div>
<p>Could not find this 😟. Try again.</p>
</div>`;
        console.log(err);
    });
}
function getBoard(board) {
    fetch(`https://api.allorigins.win/get?url=https://a.4cdn.org/${board}/catalog.json`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            data = JSON.parse(data.contents)
            let list = `

	`;
            data[0].threads.forEach(function (result) {
                list += `
	<hr>
	<div class="Thread" style='vertical-align:middle; display:inline-block;'>
    <p style="color:#ADADAD">${title(result)}</p>
    `
                if (result.images != 0) {
                    list += `
                    <img src="https://i.4cdn.org/${board}/${result.tim}${result.ext}" alt="${result.no}" style='vertical-align:middle;'/>`
                }
                list += `
                <p>${result.com}</p>
                </div>
                `;
                if (result.replies != 0) {
                    result.last_replies.forEach(function (reply) {
                        list += `
                <div class="Reply" style='background-color: #2C2A2A;border:3px solid;'>
                <p style="color:#ADADAD">>>${title(reply)}</p>
                `;
                        if (reply.hasOwnProperty("filename")) {
                            list += `
	<img style='vertical-align:middle;' src="http://i.4cdn.org/${board}/${reply.tim}s${reply.ext}" alt="${result.no}"/>
	`;
                        }
                        if (reply.hasOwnProperty("com")) {
                            list += `
	                <p>${reply.com}</p>
	                `;
                        }
                        list += '</div>'
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
}