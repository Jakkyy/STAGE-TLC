function register() {
    console.log("ciao")
}

function modifica(num) {

    let div = document.getElementsByClassName(`input-${num}`)[0];

    let i = 0;
    div.querySelectorAll("input").forEach(element => {
        element.value = div.querySelectorAll("span")[i].innerHTML;
        element.classList.remove("d-none");
        i++;
    });

    div.querySelectorAll("span").forEach(element => {
        element.classList.add("d-none");
    });

    div.querySelectorAll("button").forEach(element => {

        if (element.id == "after") {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    })
}

function conferma(num) {

    let div = document.getElementsByClassName(`input-${num}`)[0];

    let i = 0;
    div.querySelectorAll("input").forEach(element => {
        element.classList.add("d-none");

        div.querySelectorAll("span")[i].classList.remove("d-none");

        div.querySelectorAll("span")[i].innerHTML = element.value;
        i++;
    })

    div.querySelectorAll("button").forEach(element => {

        if (element.id == "after") {
            element.classList.add("d-none");
        } else {
            element.classList.remove("d-none");
        }
    })
}


async function add() {

    row = genRow();

    /*
    row.querySelectorAll("span").forEach(element => {
        console.log(element)
    })
    */
    data = {
        "nome": "marco",
        "cognome": "trebino",
        "email": "jacopo.carta123@gmail.com",
        "fax": "123-456-"
    }




    const req = new XMLHttpRequest();

    await req.open("GET", "insert.php");
    await req.send();

}



async function fetchTable() {
    const response = await (await fetch("archivio.json")).json();

    if (!response) return;

    response.forEach(element => {
        row = genInitialRow();

        const obj = {
            "nome": element.nome,
            "cognome": element.cognome,
            "email": element.email,
            "fax": element.fax
        }

        span = row.querySelectorAll("span");

        span[0].innerHTML = obj.nome;
        span[1].innerHTML = obj.cognome;
        span[2].innerHTML = obj.email;
        span[3].innerHTML = obj.fax;
    })
}


function genRow() {
    let table = document.getElementById("data-table");
    num = table.querySelectorAll("tr").length;

    row = table.insertRow();

    row.setAttribute("class", `input-${num}`);

    row.insertCell(0).innerHTML = num;
    row.insertCell(1).innerHTML = `\<input class=""> <span class="d-none"> Nome </span> </input>`;
    row.insertCell(2).innerHTML = `\<input class=""> <span class="d-none"> Cognome </span> </input>`;
    row.insertCell(3).innerHTML = `\<input class=""> <span class="d-none"> Email </span> </input>`;
    row.insertCell(4).innerHTML = `\<input class=""> <span class="d-none"> Fax </span> </input>`;
    row.insertCell(5).innerHTML = `\<button onclick='modifica(${num})'> Modifica </button> <button id='after' class="d-none" onclick='conferma(${num})'> Conferma </button> <button onclick='elimina(${num})'> Elimina </button> <button id='after' class="d-none" onclick='annulla(${num})'> Annulla sium </button>`;

    return row;
}



function genInitialRow() {
    let table = document.getElementById("data-table");
    num = table.querySelectorAll("tr").length;

    row = table.insertRow();

    row.setAttribute("class", `input-${num}`);

    row.insertCell(0).innerHTML = num;
    row.insertCell(1).innerHTML = `\<input class="d-none"> <span> Nome </span> </input>`;
    row.insertCell(2).innerHTML = `\<input class="d-none"> <span> Cognome </span> </input>`;
    row.insertCell(3).innerHTML = `\<input class="d-none"> <span> Email </span> </input>`;
    row.insertCell(4).innerHTML = `\<input class="d-none"> <span> Fax </span> </input>`;
    row.insertCell(5).innerHTML = `\<button onclick='modifica(${num})'> Modifica </button> <button id='after' class="d-none" onclick='conferma(${num})'> Conferma </button> <button onclick='elimina(${num})'> Elimina </button> <button id='after' class="d-none" onclick='annulla(${num})'> Annulla </button>`;

    return row;
}

function elimina(num) {
    document.getElementsByClassName(`input-${num}`)[0].remove();
}

function annulla(num) {
    document.getElementsByClassName(`input-${num}`)[0].remove();
}