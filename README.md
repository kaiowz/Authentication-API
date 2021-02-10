# Authentication-API-NodeJS
This API was build to simulate the functionality of a authentication system that receives cpf, phone or email as a login parameter.

### Made with:
**N**ode Js / **E**xpress / **M**ongoDB / **B**crypt / **J**WT

## Endpoints

#### POST /api/signup
This endpoint are responsible for login method.
#### Parameters
```
{
	"email": "test@hotmail.com",
	"phone": "75 923456789",
	"cpf": "56443255046",
	"pass": "1234"
}
```
#### Responses
##### Json text with Error and Result fields. The result field will have a message of succes with the record id and the token of the user. The error will report the invalid inputs.
```
{
  "error": [],
  "result": [
    {
      "msg": "6023fa8306bf6638e0d03d58 created with success"
    },
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0ZXN0QGhvdG1haWwuY29tIiwiY3BmIjoiNTY0NDMyNTUwNDYiLCJwaG9uZSI6Ijc1IDkyMzQ1Njc4OSJ9LCJpYXQiOjE2MTI5NTk4Mjd9.wJYdx06KmQbT_zPXW1wvsJBbS44xxmWPzFknxFWbMqA"
    }
  ]
}
```

```
{
  "error": [
    {
      "email": {
        "value": "",
        "msg": "Invalid e-mail!",
        "param": "email",
        "location": "body"
      },
      "cpf": {
        "value": "",
        "msg": "Invalid cpf!",
        "param": "cpf",
        "location": "body"
      },
      "phone": {
        "value": "",
        "msg": "Invalid phone!",
        "param": "phone",
        "location": "body"
      },
      "pass": {
        "value": "",
        "msg": "Invalid password!",
        "param": "pass",
        "location": "body"
      }
    }
  ],
  "result": []
}
```


#### POST /api/signin
This endpoint are responsible for register a user in database.
#### Parameters
```
{
	"login": "test@hotmail.com",
	"pass": "1234"
}
```
or
```
{
	"login": "75 923456789",
	"pass": "1234"
}
```
or
```
{
	"login": "56443255046",
	"pass": "1234"
}
```
#### Responses
##### Json text with Error and Result fields. The result field will have a message and the updated token of the user. The error will report the invalid inputs and inexistent user.
```
{
  "error": [],
  "result": [
    {
      "msg": "User logged with success"
    },
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0ZXN0QGhvdG1haWwuY29tIiwiY3BmIjoiNTY0NDMyNTUwNDYiLCJwaG9uZSI6Ijc1IDkyMzQ1Njc4OSJ9LCJpYXQiOjE2MTI5NjAwMjZ9.2m7F6J1p2ey7RPDnBxznl8Ve3TBIBHaqhx3-cl7B6-s"
    }
  ]
}
```

```
{
  "error": [
    {
      "msg": "Invalid User and/or Password"
    }
  ],
  "result": []
}
```

#### GET /api/user
This endpoint are responsible for return information of the logged user, similar of profile pages.
#### Parameters
```
{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0ZXN0QGhvdG1haWwuY29tIiwiY3BmIjoiNTY0NDMyNTUwNDYiLCJwaG9uZSI6Ijc1IDkyMzQ1Njc4OSJ9LCJpYXQiOjE2MTI5NjAwMjZ9.2m7F6J1p2ey7RPDnBxznl8Ve3TBIBHaqhx3-cl7B6-s"
}
```
#### Responses
##### Json text with Error and Result fields. The result field will have the user data.
```
{
  "notallowed": true
}
```
```
{
  "error": [],
  "result": [
    {
      "_id": "6023fa8306bf6638e0d03d58",
      "email": "test@hotmail.com",
      "cpf": "56443255046",
      "phone": "75 923456789",
      "pass": "$2b$10$TFi7Zw32sEUR.Y.EjqsuRufMqihS1.KX23WuEqQMlRDva2ZdV94hy",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0ZXN0QGhvdG1haWwuY29tIiwiY3BmIjoiNTY0NDMyNTUwNDYiLCJwaG9uZSI6Ijc1IDkyMzQ1Njc4OSJ9LCJpYXQiOjE2MTI5NjAwMjZ9.2m7F6J1p2ey7RPDnBxznl8Ve3TBIBHaqhx3-cl7B6-s",
      "__v": 0
    }
  ]
}
```

#### PUT /api/user/\_id
This endpoint are responsible for update the data of a logged user.
#### Parameters
\_id: identifier of the data

The parameters passed at the boddy are similar of the signup method, but you can choose if you want to update some parameters or all of them.
```
{
  "email": "test1@hotmail.com"
	"pass": "12345",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0ZXN0QGhvdG1haWwuY29tIiwiY3BmIjoiNTY0NDMyNTUwNDYiLCJwaG9uZSI6Ijc1IDkyMzQ1Njc4OSJ9LCJpYXQiOjE2MTI5NjAwMjZ9.2m7F6J1p2ey7RPDnBxznl8Ve3TBIBHaqhx3-cl7B6-s"
}
```
#### Responses
##### Json text with Error and Result fields. The result field will have the user data.
```
{
  "notallowed": true
}
```
```
{
  "error": [],
  "result": [
    {
      "msg": "6023fa8306bf6638e0d03d58 updated with success"
    },
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0ZXN0MUBob3RtYWlsLmNvbSIsInBob25lIjoiNzUgOTIzNDU2Nzg5IiwiY3BmIjoiNTY0NDMyNTUwNDYifSwiaWF0IjoxNjEyOTYwOTYxfQ.Auk-emReOUHhbLP7Bi1IExJITMl90NVtERI5K1PU5I8"
    }
  ]
```

#### DELETE /api/user/\_id
This endpoint are responsible for delete the data of a logged user.
#### Parameters
\_id: identifier of the data

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiZW1haWwiOiJ0ZXN0MUBob3RtYWlsLmNvbSIsImNwZiI6IjU2NDQzMjU1MDQ2IiwicGhvbmUiOiI3NSA5MjM0NTY3ODkifSwiaWF0IjoxNjEyOTYxMzMwfQ.fXRo772lVNadB-xNo2AHFbKSw00AnMnyM0IZn193AMo"
}
```

#### Responses
##### Json text with Error and Result fields. The result field will have the user data.
```
{
  "notallowed": true
}
```
```
{
  "error": [],
  "result": [
    {
      "msg": "6023f8fc06bf6638e0d03d57 deleted with success"
    }
  ]
}
```

