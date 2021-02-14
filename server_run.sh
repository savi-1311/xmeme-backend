#!/bin/bash

#Starting the MongoDB locally
sudo systemctl start mongod

#Starting the Backend server

cd backend
npm install

#Configuring environment variables

export MONGO_URI=mongodb://savi:sham1311BHAVI@cluster0-shard-00-00.46c53.mongodb.net:27017,cluster0-shard-00-01.46c53.mongodb.net:27017,cluster0-shard-00-02.46c53.mongodb.net:27017/movie?ssl=true&replicaSet=cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
export MONGO_URL=mongodb://localhost:27017
export FRONTEND_URL=http://localhost:3000
export PROD_FRONTEND_URL=http://localhost:3000
export NODE_ENV=development

#Starting the server
npm start

#back to root directory
#cd ..

#Starting the Frontend server

#cd frontend
#npm install

#Configuring environment variables

#export REACT_APP_BACKEND_URL_DEV= http://localhost:8081
#export REACT_APP_NODE_ENV=development
#export REACT_APP_BACKEND_URL_PROD= http://localhost:8081

#Starting the server
#npm start


