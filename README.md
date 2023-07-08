# Usage

* Run `npm install` to installl dependencies
* Run `npm run start` to start the local server
* Load `http://localhost:8000` to test the endpoint. It will display a json result `{"message":"Ok"}`

# API Endpoints

## GET /_api/list

Get a list of users

```json
{
    "data": {
        "items": [
            {
                "key": "value",
            }
        ],
        "pagination": {
            "total": 100,
            "page": 1,
            "pageSize": 20,
        }
    }
}
```

## GET /_api/detail

Get user information by user id

```json
{
    "data": {
        "_key": "12345",
        "name": "My name is 12345",
        "description": "Example description"
    }
}
```

## GET /_api/invalid

Validation is failed

* Response's header status: `400`
```json
{
    "errors": [
        {
            "code": "ValidationError",
            "message": "age must be an integer number",
            "metadata": {
                "path": ["age"],
                "constraint": "isInt",
                "mix": 1,
                "max": 10
            }
        }
    ]
}
```

## GET /_api/invalid-array

Validation is failed

* Response's header status: `400`
```json
{
    "errors": [
        {
            "code": "ValidationError",
            "message": "name must be an string",
            "metadata": {
                "path": ["listCustomer", 23, "name"], // Item 23 of list is wrong.
                "constraint": "isString",
                "mix": 1,
                "max": 10
            }
        }
    ]
}
```

## GET /_api/detail-not-found

Item detail is not found

* Response's header status: `404`
```json
{
    "errors": [
        {
            "code": "ValidationError",
            "message": "name must be an string",
            "metadata": {
                "path": ["listCustomer", 23, "name"], // Item 23 of list is wrong.
                "constraint": "isString",
                "mix": 1,
                "max": 10
            }
        }
    ]
}
```

## GET /_api/application-general-error

Item detail is not found

* Response's header status: `400`
```json
{
    "errors": [
        {
            "code": "ApplicationError", // AccountNotFound, WrongPassword, SalesOfficeNotFound, ...
            "message": "Something went wrong",
            "metadata": {
                "constraint": "notEnoughMoneyToBuySomething",
                "currentMoney": 1000,
                "minMoney": 5000
            }
        }
    ]
}
```
## Read more ...








