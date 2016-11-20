const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// creating an express application
var app = express();

// handlebar to support partial
hbs.registerPartials(__dirname + '/views/partials');

// setting hbs view engine
app.set('view engine', 'hbs');


// app.use for middleware
// what to do next
app.use((req, res, next) => { 
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append the server.log');
        }
    });
    next();
});

// new middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// express middleware
app.use(express.static(__dirname + '/public'));


// helper that will return some data, can be used for something
// that will be used in all the stuff
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

// capitalization helper
hbs.registerHelper('screamIT', (text) =>{
    return text.toUpperCase();
});

// setting up HTTP route handler
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express </h1>');
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeMessage : 'Hello welcome to my page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'Hello Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle : 'Projects',
        welcomeMessage : 'Welcome to my project page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorCode: '200',
        errorMessage: "Unable to find the data"
    })
});



// bind the app to a port to listen
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`)
});
