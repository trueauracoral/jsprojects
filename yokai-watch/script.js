document.addEventListener('keydown', handleKeyPress);

let x = 1;
let y = 1;
let medalNumber = 1;
let medalId = `medal-${medalNumber}`;
let selectedMedal = document.getElementById(medalId);
let page = 1;
let pages = 20;

function handleKeyPress(event) {
    console.log(medalId);
    movement = false;
    switch (event.key) {
        case 'ArrowUp':
            movement = true;
            if (!((y - 1) < 1)) {
                y -= 1;
            }
            break;
        case 'ArrowDown':
            movement = true;
            if (!((y + 1) > 4)) {
                y += 1;
            }
            break;
        case 'ArrowLeft':
            movement = true;
            if (!((x - 1) < 1)) {
                x -= 1;
            } else {
                if (((page) > 1)) {
                    page--;
                    paginate(page, "left");
                    x = 6;
                    // I assume now given page number I must put the associated yo-kai
                } 
            }
            break;
        case 'ArrowRight':
            movement = true;
            if (!((x + 1) > 6)) {
                x += 1;
            } else {
                console.log(page);
                console.log(pages);
                if (((page + 1) < pages)) {
                    page++;
                    paginate(page, "right");
                    x = 1;
                    // I assume now given page number I must put the associated yo-kai
                }
            }
            break;
    }
    function paginate(page, direction) {
        if (direction == "left") {
            move = -12;
        } else if (direction == "right") {
            move = 12;
        }

        // Apperently this is a new feature so it isn't supported in older browsers
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
        const binderMove = [
            { transform: `translateX(${move}px)` },
            { transform: "translateX(0px)" },
          ];
          
        const binderTiming = {
            duration: 75,
            iterations: 1,
        };
          
        const binder = document.querySelector("#binder");
          
        binder.animate(binderMove, binderTiming);
          
        document.getElementById("page-number-l").innerHTML = zfill(page);
        document.getElementById("page-number-r").innerHTML = zfill(page+1);
    }
    function zfill(number) {
        return number.toString().padStart(2, '0');
    }
    console.log(`(${x}, ${y})`);
    if (movement) {
        if (x > 3) {
            medalNumber = 12 + (y - 1) * 3 + (x - 3);
        } else if (x <= 3) {
            medalNumber = (y - 1) * 3 + x;
        }

        console.log(medalId);

        var outlinedElements = document.getElementsByClassName("outlined");
        while (outlinedElements.length > 0) {
            outlinedElements[0].style.cssText = ""; // Clear styles
            outlinedElements[0].classList.remove("outlined");
        }

        medalId = `medal-${medalNumber}`;
        selectedMedal = document.getElementById(medalId);
        console.log(selectedMedal.id);

        var outlineElement = selectedMedal.getElementsByClassName("outline")[0];
        if (outlineElement) {
            outlineElement.classList.add("outlined");
            selectedMedal = document.getElementsByClassName("outlined")[0];

            selectedMedal.style.cssText = `
                position: absolute;
                z-index: 7;
                top: -5%;
                left: -5%;
                width: 110%;
                height: 110%;
                border: 3px dashed yellow;
                box-sizing: border-box;
                border-radius: 50%;
                transform: scale(1.8);
                animation: spin 3s infinite linear;
            `;
        }
    }
}

function tableGen(width, height) {
    var verticals = "";
    var number = 0;
    for (let i = 0; i < height; i++) {
        var horizontals = "";
        for (let o = 0; o < width; o++) {
            number += 1;
            //var name = `${i+1}-${o+1}`
            var name = `medal-${number}`
            horizontals += `\n\t<td id="medal-${number}">
            <div class="medal-container">
                <div id="triangle"></div>
                <div id="text-${number}"></div>
                <div class="outline" data-selected="false"></div>
                <div id="circle"></div>
            </div>
        </td>`;
            var trformat = `\n<tr>${horizontals}\n</tr>\n`
        }
        verticals += trformat;
    }
    table = `<table>${verticals}</table>`
    //console.log(table);
    return table;
}

console.log(tableGen(3, 4));