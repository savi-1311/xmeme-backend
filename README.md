# X-Meme 


The Backend Website for API calls is hosted [Here](http://xmeme-backend-savi.herokuapp.com/)

Full-Stack Project is hosted at [Here](https://xmeme-frontend-savi.netlify.app/)

<h4 align="left">Languages and Tools:</h4>
<p align="left"> <a href="https://expressjs.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="express" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/html-5.png"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"/> </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="mongodb" width="50" height="50"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a> <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a><a href="https://www.netlify.com" target="_blank"> <img src="https://www.netlify.com/img/press/logos/logomark.png" alt="Netlify" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="React" width="60" height="40"/> </a></p>


* __Frontend:__ Reactjs, Javascript, Bootstrap, HTML, CSS
* __Backend:__ Nodejs, Expressjs
* __Databse:__ MongoDB
* __Deployment:__ Heroku, Netlify
* __Tools:__ Git


### The following API calls can be made with this project

***

#### GET Requests

* > __/memes__

It scans the database and an array containing the last 100 added meme details, memeID, name, caption and url .

<br>

* > __/memes/id__

Returns the meme with the specified id.

<br>

#### POST Requests

* > __/memes__

The meme with the provied name,url and caption is posted

<br>

***

### Setting Up the Project (Do this for both fronted and backend folders)

1. Clone the repo
   
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file using the template .env.template and add values accordingly.
   
### Usage

1.  To run the server
    ```sh 
    npm start 
    ```

The server will then run on port 8081 for Frontend and 3000 for backend. 
***
