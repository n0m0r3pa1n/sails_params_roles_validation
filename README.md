# [Sails](http://sailsjs.org) app with [Joi](https://github.com/hapijs/joi) params validation

## Requirements

For the validation to work there are 2 required things:
  1. Policy - this is the **policies/modelValidation.js** policy which is registered within the **config/policies.js** file. It is registered for the 
   **AuthController.login()** action
  2. Add the validation model name to the route - this can be found in the **config/routes.js** file. As you can see there
  the login method with the POST action is decorated with another property called **validation**
  ```
  'post /': { controller: "AuthController", action: "login", validation: "login" },
  ```
  
## How it works?

The modelValidation.js file makes the whole thing work. For it to work you need to attach the policy to the route you need body, params or query validation. Check point 1 from above.
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

## Others

There are some unused stuff here, so please don't give them a lot of attention. They are left from a previous project I wrote.
