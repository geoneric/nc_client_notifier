var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var bodyParser = require("body-parser");


app.use(bodyParser.json());


// Echo the client's ID back to them when they connect.
// This ID can be used later by others, when notifying the client of some
// result.
io.on("connection", function(client) {
    client.emit("register", client.id);
});


// Forward task results to the clients who initiated them.
app.post("/notify", function(request, response) {

    var client = io.sockets.connected[request.body.client_id];
    client.emit("notify", JSON.stringify(request.body.result));

    // response.type("text/plain");
    // response.send("Result broadcast to client");

    response.status(201).end();

});


server.listen(8080);
