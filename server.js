// require dotenv so that I can use the .env fil
require('dotenv').config(); 
const express = require('express'); 
const methodOverride = require('method-override');
// require dotenv so that I can use the .env fil 
const mongoose = require('mongoose')
const routes = require('./controllers/log.js')

const app = express();

const jsxViewEngine = require('jsx-view-engine');

const PORT=process.env.PORT ||3000

//global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

//MiddleWare
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near top, around the other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));

//to connect log.js
 app.use('/logs',routes)

app.get('/', (req, res) => {

    res.send(`<a href = ${'/logs'} > Go to Index Page</a> <br/>`)
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});