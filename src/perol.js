"use strict";
require('dotenv').config();
// -----------------------------------------------------------
// Variables
// -----------------------------------------------------------
const port = process.env.PORT || 3008
  ,express = require('express')
  ,app = express()
  ,server = require('http').Server(app)
  ,bodyParser = require('body-parser')
  ,cors = require('cors')
  ,morgan = require('morgan')
  ,moment = require('moment')
  ,cookieParser = require('cookie-parser')

  // Security
  ,helmet = require('helmet')

  // File system
  ,fs = require('fs')
  ,path = require('path')

  // DB Init
  ,mongoose = require('mongoose')
  ,db = mongoose.connection
  ,ObjectId = require('mongoose').Types.ObjectId

// -----------------------------------------------------------
// Application configuration
// -----------------------------------------------------------
moment.locale('ru');

app.use(helmet());
app.use(morgan('dev', 
  { skip: (req, res) => { return res.statusCode < 400; }}
));  
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.set('view engine', 'pug');

// -----------------------------------------------------------
// MongoDB Connection
// -----------------------------------------------------------
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
db.on("error", console.error.bind(console, "Something wrong, my friend :("));
db.once("open", () => { console.log("PerolDesign DB Connection Succeeded"); });

// -----------------------------------------------------------
// Routes
// -----------------------------------------------------------
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contacts', (req, res) => {
  res.render('contacts');
});

// -----------------------------------------------------------
// Other routes
// -----------------------------------------------------------
app.get('*', (req, res) => {
  res.status(404).render('404');
});

// -----------------------------------------------------------
// Start server
// -----------------------------------------------------------
server.listen(port, () => {
  console.log('Listening on port ' + port);
});