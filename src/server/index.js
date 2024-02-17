// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.js');

// Configuring dotenv to load environment variables from a .env file
dotenv.config();

// Creating an instance of the express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

// Logging the directory name
console.log(__dirname);

// Setting up the base URL and API key
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = process.env.API_KEY;
console.log('Your API Key is ${process.env.API_KEY}');

// Variable to store user input
let userInput = [];

// Route to serve the main HTML file
app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

// Route to test API response
app.get('/test', function(req, res) {
    res.send(mockAPIResponse);
});

// POST Route to analyze sentiment
app.post('/api', async function(req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;

    try {
        const response = await fetch(apiURL);
        const mcData = await response.json();
        console.log(mcData);
        res.send(mcData);
        /** server sends only specified data to the client with below codes
         * const projectData = {
         *  score_tag : mcData.score_tag,
         *  agreement : mcData.agreement,
         *  subjectivity : mcData.subjectivity,
         *  confidence : mcData.confidence,
         *  irony : mcData.irony
         * }
         * res.send(projectData);
         * */
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});

// Starting the server on port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
});