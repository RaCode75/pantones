const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mySQLStore = require('express-mysql-session');
const { database } = require('./keys');



//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//midlewares
app.use(session({
    secret: 'racode75sqlsession',
    resave: false,
    saveUninitialized: false,
    store: new mySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/pantones',require('./routes/pantones'));

//public
app.use(express.static(path.join(__dirname, '/public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
})