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
        console.log("Push number."); 
    }
);

//Push Email and Password
application.post(
    "/api/user",
    (request, response) => {
        var hash = crypto.createHash('md5').update(request.body.value2).digest('hex');
        var credentials = users.data.find(e => e.email === request.body.value1);

        if (credentials == undefined) {
                numbers.data.push({email: request.body.value1, password: hash});
                files.writeFile(
                    __dirname + "/../data/users.json",
                    JSON.stringify(users, null, 4),
                    (_) => {
                        console.log("Credentials database saved.");
                    }
                );
                response.json({ datacred: "Credentials Created"});
                console.log("Emails don't match.");
        }else {
                var passworddata = credentials.password;

                if(passworddata == hash) {
                        response.json({ datacred: "Credentials Valid"});
                        console.log("Emails and Password Hashes match.");
                }else {
                        response.json({ datacred: "Credentials Invalid"});
                        console.log("Password Hashs do not match.");
                }
        }
        response.status(200);
        console.log("Post Email and Password.");
    }
);

// Root path
application.use(
    "/",
    express.static(__dirname + "/public"),
    
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
