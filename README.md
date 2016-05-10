# [Sails](http://sailsjs.org) app with [Joi](https://github.com/hapijs/joi) params and Roles validations

## Run project

1. Uncomment the line 13 in AuthController for the creation of a user - replace username and password with your own
2. Then run the following commands in sequence
```
sudo apt-get install redis-server
npm install
nodemon //or "sails lift"
```
3. You must have MongoDB & Redis installed
4. Open your localhost:3338 and try to enter letters in the password. Joi will throw an exception that it need to be only numbers. Strange, huh.

## Params Validation Requirements

For the validation to work there are 2 required things:
  1. Policy - this is the **policies/modelValidation.js** policy which is registered within the **config/policies.js** file. It is registered for the 
   **AuthController.login()** action
  2. Add the validation model name to the route - this can be found in the **config/routes.js** file. As you can see there
  the login method with the POST action is decorated with another property called **validation**
  
  ```
  'post /': { controller: "AuthController", action: "login", validation: "login" },
  ```
  
## How params validation works?

The **modelValidation.js** file makes the whole thing work. For it to work you need to attach the policy to the route you need body, params or query validation. Check point 1 from above.
  1. It looks for the file with the name, which is contained in the validation property of the route. In my case the file is called
   login.js and it resides in the api/validation folder
   
   ```
   var schema = require('../validation/' + req.options.validation)
   ```
   
  2. It takes the **schema.body** Joi schema and validates the body of the request with it. You can make schema.params or schema.query and validate other params yourself.
  3. It called Joi.validate(req.body, schema.body, (err, result))
   * If the result fails it returns res.badRequest(err) which is the error page from sails with the Joi exception details
   * If the validation succeeds it calls the next() function to continue to the next policy
   
P.S.
You can attach multiple policies for a route by using an array ["sessionAuth", "modelValidation"]

## Roles Validation Requirements

  1. Policy - this is the **policies/sessionAuth.js** policy which is registered within the **config/policies.js** file. It is registered for the HomeController.
  2. Add the roles required for a user to have to access the route as an attribute to the route - the roles are in the route.roles property as you can see in the **config/routes.js** file.
  
## How roles validation works?

The **sessionAuth.js** file makes the whole thing work. It checks if the current users is logged in and gets his roles. It checks if each of the required roles for the route are met
 in the user roles. If even one is missing the user won't be able to access the route.


## Others

There are some unused stuff here, so please don't give them a lot of attention. They are left from a previous project I wrote.
