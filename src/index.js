const express = require('express');
const morgan  = require('morgan');
const exhbs   = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const path    = require('path');

const { database } = require('./keys');
const pool = require('./db');

// Inicializacion
const app = express();


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partial'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//Express session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/',require('./route/crud'));

// Public 
app.use(express.static(path.join(__dirname, 'public')));

// inicio del servidor 
app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});