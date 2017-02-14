var app = require("express")();
var http_server = require("http").Server(app);
var io = require("socket.io")(http_server);
var body_parser = require("body-parser");


app.use(body_parser.json({strict: false, limit: "1mb"}));


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

    response.status(201).end();

});


http_server.listen(8080);
