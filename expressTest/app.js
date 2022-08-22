const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");

app.get("/", function(request, response) {
    response.send("ciao")
})

app.get("/add", function(request, response) {
    response.send("Inserisci un nome <br> esempio -> /add/prova");
});


app.get("/add/:name/:age", async function(request, response) {

    params = request.params;


    if (isNaN(params.age)) return response.send("Inserisci un'età valida");

    data = await fs.readFileSync("database.json", "utf-8");


    try {
        obj = JSON.parse(data); //now it an object
    } catch {
        response.send("Nessun dato presente");
    }


    obj.users.push({ name: params.name, age: params.age, id: obj.users.length }); //add some data
    json = JSON.stringify(obj, null, 2); //convert it back to json
    fs.writeFileSync('database.json', json, 'utf8'); // write it back 

    response.send("Il tuo id è ora " + (obj.users.length - 1));

});



app.get("/remove/:name/:id", function(request, response) {
    params = request.params;

    data = fs.readFileSync("database.json", "utf-8");


    try {
        obj = JSON.parse(data); //now it an object
    } catch {
        response.send("Nessun dato presente");
    }

    console.log(JSON.parse(obj))
    elem = JSON.parse(obj).users.find(function(e) {
        return e.id == params.id;
    })

    console.log(elem)
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})