const express = require("express");
const bodyParser = require("body-parser");
const db = require("./serverside/db")
let postRequest = require('./serverside/requests/postRequest')
const cookieParser = require("cookie-parser");

// init db
db.init()

const server = express();
server.use(bodyParser.urlencoded({ extended: true,limit:'20mb' }))
server.use(bodyParser.json())
server.use(cookieParser());
// Client maybe trying different way. But we dont.
server.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.json({error:'Bad Request'});
    }
});




server.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Required Auth permission for request
    res.setHeader('authorization', '*');

    // Pass to next layer of middleware
    next();

});

// server.get("*", async (req, res) => {
//     console.log(req.originalUrl)
//
// });

server.post('*', postRequest.authorization, async (req,res) => {

    return postRequest.analyze(req,res)
})
console.log(`
  Ready on http://localhost:8181
`);

server.listen(8181);
