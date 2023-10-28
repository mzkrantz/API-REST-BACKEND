# nodejs-secure restful-api with jwt web-Token

### Prerequisites

Node
npm
Express
jsonwebtoken
mongoose


### Setup

> now install npm and packages

```shell
$ npm install
## Running the tests

It consist of a User model and controller. The model
defines the data, and the controller will contain all 
the business logic needed to interact with the database. 

It has a db file which will be used to
connect the app to the database

The server file is used to spin up the server and tells the
app to listen on a specific port.

Let’s test this out. Why not?
Open up your REST API testing tool of choice, I use Postman 

Go back to your terminal and run nodemon app.js. 


Open up Postman and hit the register endpoint (http://localhost:4000/api/users/registration). Make sure to pick the POST method and x-www-form-url-encoded.
Now, add some values (name, mail, password)

See the response? The token is a long jumbled string. 
To try out the http://localhost:4000/api/users/users endpoint, first copy the token. Change the method to GET.
Now you can add the token to the request header.

You will get list of users...

Try to update users the http://localhost:4000/api/users/update endpoint, and the method to PUT with x-www-form-url-encoded.

Delete some users hit http://localhost:4000/api/users/delete endpoint with the method DELETE.

# API-REST-BACKEND
