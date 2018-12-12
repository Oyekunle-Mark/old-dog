// require the dependencies
let express = require('express');
let path = require('path');
let logger = require('morgan');

//create an express app
let app = express();

//add the logging middleware to the express middleware stack
app.use(logger('short'));

//the middleware to serve the file
let staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

//the error handling middleware
app.use(function(req, res) {
	res.status(404).send('File not found!');
});

//start the express app
app.listen(3000, function() {
	console.log('The file server  has started on port 3000.');
});
