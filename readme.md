TV Shows REST API (NodeJS)!
===================
[A TV Show RESTful Web Services](http://guarded-river-66359.herokuapp.com/api) created with Node and ExpressJS. This project was built while learning the REST API with Node. The project is been deployed on Heroku.

The IDE used was WebStorm by Intellij.



--------
Dependencies:
-----
Following are the dependencies of this project

 1. [Express](https://expressjs.com)
 2. [Mongoose](http://mongoosejs.com)
 3. [Body Parser](https://www.npmjs.com/package/body-parser-json)
 4. [Nodemon](https://www.npmjs.com/package/nodemon)

------
Setup and Usage:
------

    git clone https://github.com/vipulmahadik/NodeJS_TV_show_RESTful_WebServices.git

Install the dependencies using npm package manager

    npm install

Create a file secret.js in ./app/models/ sub-directory, and add the mongoDB url as given below.

    module.exports = function (mon) {
        mon.connect('mongodb://url");
    };

In terminal type

    npm start

Open browser on url

    localhost:4800/api

----
REST Routes:
-----
Following are the routes supported by Web Services.

![enter image description here](https://raw.github.com/vipulmahadik/NodeJS_TV_show_RESTful_WebServices/master/app/routes/routes_table.png)