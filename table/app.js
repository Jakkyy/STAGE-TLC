const express = require("express");

//creazione dell'app
const app = express();
const port = 6666;

app.use(express.static("public"));

//index
app.get("/", (request, response) => {
    response.sendFile("/home/tlcws/Scrivania/table/index.html");
})

app.get("/add/:type/:si", function(request, response) {
    params = request.params;

    response.send(params)
})

app.use(function(request, response, next) {
    response.status(404).sendFile("/home/tlcws/Scrivania/table/404.html");
})

app.listen(port, () => {
    console.log(`Exasple app listening at http://localhost:${port}`)
})