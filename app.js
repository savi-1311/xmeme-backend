var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var assert = require('assert');
var mongo = require('mongodb');
const helmet = require("helmet");
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');



var url = (process.env.NODE_ENV=="production")?(process.env.MONGO_URI):(process.env.MONGO_URL);

var app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	cors({
		origin: (process.env.NODE_ENV=="production")?(process.env.PROD_FRONTEND_URL):(process.env.FRONTEND_URL),
		credentials: true,
	})
	);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/memes', function(req,res,next){
	var resultArray =[];
	mongo.connect(url, function(err,client)
	{
		if(err)
		{
			console.log("Error Occured");
			console.log(err);
		}
		else
		{
			var db = client.db('test');
			var size;
			db.collection('meme-data').countDocuments((function(err, result) {
				if (result>0) {

					size=result;
					if(size>100)
					{
						var cursor = db.collection('meme-data').find().skip(size-100);
						var count=0;
						cursor.forEach(function loop(doc,err)
						{
							if(loop.stop){ return; }
							var item = 
							{
								"id": doc._id,
								"name": doc.name,
								"url": doc.url,
								"caption": doc.caption
							}
							resultArray.push(item);
							count++;
							if(count==100)
								loop.stop = true;
						},function()
						{
							client.close();
							resultArray.reverse();
							res.status(200).send(resultArray);
						});
					}
					else
					{
						var cursor = db.collection('meme-data').find();
						cursor.forEach(function loop(doc,err)
						{
							if(loop.stop){ return; }
							var item = 
							{
								"id": doc._id,
								"name": doc.name,
								"url": doc.url,
								"caption": doc.caption
							}
							resultArray.push(item);
						},function()
						{
							client.close();
							resultArray.reverse();
							res.status(200).send(resultArray);
						});
					}
				}
			}));

		}
	});
});



app.post('/memes', function(req,res,next){

	var item = {
		"name": req.body.name,
		"url": req.body.url,
		"caption": req.body.caption
	};

	mongo.connect(url,function(err,client)
	{
		if(err)
		{
			console.log("Error Occured");
			console.log(err);
		}
		else
		{
			var db = client.db('test');
			var flag=0;
			var cursor = db.collection('meme-data').find();
			cursor.forEach(function loop(doc,err)
			{
				if(loop.stop){ return; }
				var item1 = 
				{
					"id": doc._id,
					"name": doc.name,
					"url": doc.url,
					"caption": doc.caption
				}
				if(item1.name==item.name && item1.url==item.url && item1.caption==item.caption)
				{
					flag=1;
					res.status(409).send("Duplicates!");
					loop.stop = true;
				}
			},function()
			{
				if(flag==0)
				{
					db.collection('meme-data').insertOne(item,function (err,results)
					{
						var response = 
						{
							"id": item._id
						}
						res.status(200).json(response);
						client.close();
					});
				}
			});
		}
	});
	
});


app.get('/memes/:id', function(req,res,next){
	mongo.connect(url, function(err,client)
	{
		if(err)
		{
			console.log("Error Occured");
			console.log(err);
		}
		else
		{
			var flag=0;
			var id = req.params.id;
			var db = client.db('test');
			var cursor = db.collection('meme-data').find();
			cursor.forEach(function loop(doc,err)
			{
				if(loop.stop){ return; }
				var item = 
				{
					"id": doc._id,
					"name": doc.name,
					"url": doc.url,
					"caption": doc.caption
				}
				if(item.id==id)
				{
					flag=1;
					res.status(200).json(item);
					loop.stop = true;
				}
			},function()
			{
				client.close();
				if(flag==0)
					res.status(404);
			});

		}
	}
	)});

app.use(function(req, res, next) {
	next(createError(404));
});


module.exports = app;