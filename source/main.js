// Load package
const express = require("express");
const files = require("fs");
const crypto = require("crypto");

// Instantiate
const application = express();
const numbers = {};
const users = {};

// Load data
files.readFile(
    __dirname + "/../data/numbers.json",
    (_, data) => {
        Object.assign(numbers, JSON.parse(data));
        console.log("Numbers database read.");
    }
);

//Load Email and Password data
files.readFile(
    __dirname + "/../data/users.json",
    (_, data) => {
        Object.assign(users, JSON.parse(data));
        console.log("Email and Password database read.");
    }
)

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

// Push number expects JSON as
// { value: 0123456789 }
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
        console.log("Push number.");
    }
);

// Push Email and Password expect the JSON to be formatted as
//{
//    email: "some@email.srv",
//    password: "somepassword"
//}
application.post(
    "/api/user",
    (request, response) => {

        // Sanitize input
        const email = typeof request.body.email == "string" ? request.body.email : "";
        const hash = typeof request.body.password == "string" ? crypto.createHash('md5').update(request.body.password).digest("base64"): "";
        const credentials = users.data.find((e) => { return e.email == email; });

        // Create new user
        if (!credentials) {
                const user = {
                    email: email,
                    password: hash
                };
                users.data.push(user);
                files.writeFile(
                    __dirname + "/../data/users.json",
                    JSON.stringify(users, null, 4),
                    (_) => {
                        console.log("Credentials database saved.");
                    }
                );
                response.status(200);
                response.json({ status: "Credentials Created" });
                console.log("User created.");
        }

        // Log the user in
        else if (credentials.password == hash) {
            response.status(200);
            response.json({ status: "Credentials Valid" });
            console.log("User logged in.");
        }

        // Bad password
        else {
            response.status(200);
            response.json({ status: "Credentials Invalid" });
            console.log("User login failed.")
        }
    }
);

// Root path
application.use(
    "/",
    express.static(
        __dirname + "/public",
        { extensions: [ "html" ] }
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
