// require the dependencies
let express = require('express');
let fs = require('fs');
let path = require('path');

//create an express app
let app = express();

//add the logging middleware to the express middleware stack
app.use(function(req, res, next) {
	console.log('Request IP: ' + req.url);
	console.log('Request date: ' + new Date());
	next();		//pass control to the next middleware
});

//the middleware to serve the file
app.use(function(req, res, next) {
	let filePath = path.join(__dirname, "static", req.url);
	fs.stat(filePath, function(err, fileInfo) {
		if (err) {	//if file does not exist
			next(new Error('File does not exist.'));
			return;
		}

		if (fileInfo.isFile()) {
			res.sendFile(filePath);
		} else {
			next(new Error('Error sending file.'));
		}
	});
});

//the error handling middleware
app.use(function(err, req, res, next) {
	res.status(404).send('File not found!');
});

//start the express app
app.listen(3000, function() {
	console.log('The file server  has started on port 3000.');
});
