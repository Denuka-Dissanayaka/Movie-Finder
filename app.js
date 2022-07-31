const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('search');
})

app.get('/results', (req, res) => {
    const query = req.query.search;

    request(`https://api.themoviedb.org/3/search/movie?api_key=fbef4e0b8aa9e88d46b6419cb3be883e&query=${query}`, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        const data = JSON.parse(body);
        res.render('movies', { data: data, searchQuery: query });
    })

})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('listen on port 3000');
})