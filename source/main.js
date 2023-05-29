// Load package
const express = require("express");
const files = require("fs");

// Instantiate
const application = express();
const numbers = {};

// Load data
files.readFile(
    __dirname + "/../data/numbers.json",
    (_, data) => {
        Object.assign(numbers, JSON.parse(data));
        console.log("Numbers database read.");
    }
);

// API parser
application.use(
    "/api",
    express.json()
);

// List numbers
application.get(
    "/api/numbers",
    (request, response) => {
        response.status(200);
        response.json({ values: numbers.data });
        console.log("Get numbers.");
    }
);

// Push number
application.post(
    "/api/number",
    (request, response) => {
        if (isFinite(request.body.value) && numbers.data.length < 1024) {
            numbers.data.push(Number(request.body.value));
            files.writeFile(
                __dirname + "/../data/numbers.json",
                JSON.stringify(numbers, null, 4),
                (_) => {
                    console.log("Numbers database saved.");
                }
            );
        }
        response.status(200);
        response.json({ values: numbers.data });
        console.log("Get numbers.");
    }
);

// Root path
application.use(
    "/",
    express.static(__dirname + "/public")
);

// Not Found
application.all(
    "*",
    (request, response) => {
        response.status(404);
        if (request.accepts("html")) {
            response.sendFile(__dirname + "/public/404.html");
        }
        else if (request.accepts("json")) {
            response.json({ "error": "Not Found."});
        }
        else {
            response.type("txt");
            response.send("Not Found.");
        }
        console.log("Not found.");
    }
);

// Port
application.listen(
    3000,
    () => {
        console.log("Server start.")
    }
);
