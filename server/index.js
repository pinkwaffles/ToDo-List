var express = require('express');
var app = express();
var db = require('../database/index.js');
app.use(express.static(__dirname + '/../client/dist'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getTasks', (req, res) => {
	db.getTasks((err, result) => {
		if(err){
			console.log(err);
			res.status(500).json({ error: 'message' });
		} else {
			res.status(200).json(result);
		}
	});
});

app.post('/addTasks', (req, res) => {
	console.log(req.body.task);
	db.addTask(req.body.task, (err, result) => {
		if(err){
			res.status(500).json({ error: 'message' });
		} else {
			res.status(200).send();
		}
	})
})

app.listen(3000);