var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({
        message: 'Ok'
    })
});

// Success ----------------
app.get("/_api/list", (req, res, next) => {
    let data = [];
    for (let index = 0; index <= 20; index++) {
        data.push({
            _key: index + 1,
            name: "My name is " + (index + 1),
            description: "Example description"
        })
    }
    
    res.json({
        data: {
            items: data,
            pagination: {
                total: 100,
                page: 1,
                pageSize: 20,
            }
        }
      })
});

app.get("/_api/detail", (req, res, next) => {
    res.json({
        data: {
            _key: 12345,
            name: "My name is " + 12345,
            description: "Example description"
        }
    })
});

// Error ----------------
app.get("/_api/invalid", (req, res, next) => {
    res.status(400)

    res.json({
        errors: [
            {
                code: 'ValidationError',
                message: 'age must be an integer number',
                metadata: {
                    path: ['age'],
                    constraint: 'isInt',
                    mix: 1,
                    max: 10
                }
            }
        ]
    })
});

app.get("/_api/invalid-array", (req, res, next) => {
    res.status(400)
    res.json({
        errors: [
            {
                code: 'ValidationError',
                message: 'name must be an string',
                metadata: {
                    path: ['listCustomer', 23, "name"], // item 23 của array bị lỗi.
                    constraint: 'isString',
                    mix: 1,
                    max: 10
                }
            }
        ]
    })
});

app.get("/_api/detail-not-found", (req, res, next) => {
    res.status(404)
    res.json({
        errors: [
            {
                code: 'NotFound',
                message: 'Not Found'
            }
        ]
    })
});

app.get("/_api/application-general-error", (req, res, next) => {
    res.status(400)

    res.json({
        errors: [
            {
                code: 'ApplicationError', // AccountNotFound, WrongPassword, SalesOfficeNotFound, ...
                message: 'Something went wrong',
                metadata: {
                    constraint: 'notEnoughMoneyToBuySomething',
                    currentMoney: 1000,
                    minMoney: 5000
                }
            }
        ]
    })
});

app.get("/_api/unauthorized", (req, res, next) => {
    res.status(401)
    res.json({
        errors: [
            {
                code: 'Unauthorized',
                message: 'Unauthorized'
            }
        ]
    })
});

app.get("/_api/forbidden", (req, res, next) => {
    res.status(403)
    res.json({
        errors: [
            {
                code: 'Forbidden',
                message: 'Forbidden'
            }
        ]
    })
});

app.get("/_api/internal-server-error", (req, res, next) => {
    res.status(500)
    res.json({
        errors: [
            {
                code: 'InternalServerError',
                message: 'Internal Server Error'
            }
        ]
    })
});