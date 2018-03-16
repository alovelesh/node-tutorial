const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;
// set hbs
app.set('view engine','hbs');
// register helper
hbs.registerHelper('getCopyRightYear',()=>{
	return new Date().getFullYear();
})
// register helper with param
hbs.registerHelper('toUpperCase',(para)=>{
	return para.toUpperCase();
})
// register partials
hbs.registerPartials(__dirname+'/views/partials');
// Middle layer to create log file of each request.
app.use((req,res,next)=>{
	var log = `${new Date().toString()} ${req.method} ${req.url}`;
	fs.appendFile('server.log',log+ '\n', (err)=>{
		//console.log('Server.log error');
	});
	console.log('log',log);
	next();
})
// If site is under maintenance then uncomment below
// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// })

//app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
	//res.send('Home Page');
	res.render('home.hbs', {
		content:'Some content about home page!',
		createdBy : 'Lovelesh Agrawal'
	})
})

app.get('/about',(req,res)=>{
	res.render('about.hbs', {
		content:'Some content about about us page!',
		createdBy : 'Lovelesh Agrawal'/*,
		date:new Date().getFullYear()*/
	})
})

app.listen(port, ()=>{
	console.log("Server listen on port "+port);
})