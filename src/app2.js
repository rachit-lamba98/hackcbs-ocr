"use strict"
var express = require('express');
var app = express();
const path = require('path');

app.listen(3001, function() {
	console.log('server running on port 3001');
} )


app.get('/name', callName, callBack);

function callName(req, res, next) {
	res['img_path'] = "nonono";
	console.log(res.img_path + " from last one");
	next();
	var exec = require("child_process").exec;

	const filepath = path.join(__dirname, '../python_scripts/classifier.py');

	exec('python ' + filepath, (error, stdout, stderr)=>{
		if(error)
			console.log(error)
		else{
			// console.log(stdout.toString());
			// res.send(stdout.toString());
		}
	});

	// var spawn = require("child_process").spawn;

	// var process = spawn('python',["../python_scripts/classifier.py"], ['./models/clf.joblib', './models/cv.joblib'], {stdio:'inherit'});
	//
  // console.log("Spawned: " + process.pid);
	//
	// process.stdout.on('data', function(data) {
  //   console.log("HELLoooooooooO");
	// 	res.send(data.toString());
	// });
	//
  // process.on('error', (error)=>{
  //   console.log("An error occured: " + error);
  // });
	//
  // process.on('close', (code)=>{
  //   console.log('Child process exited with code ' + code);
  // });
	//
  // process.stdout.on('end', ()=>{
  //   console.log('Finished collecting data chunks');
  // });
}

function callBack(req, res){
	console.log(res.img_path + " from second callback");
}
