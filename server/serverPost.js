const express = require('express');
const chalk = require('chalk');
const app = express();
let port = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

app.use('/assets', express.static('./public'));

app.set('view engine','ejs');

app.get

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/person/:id', (req, res) => {
    res.render('person', {ID: req.params.id});
});

app.get('/api', (req, res) => {
    res.json({fisrtname: 'Jhon', lastname: 'Doe'});
});

app.post('/inventor', (req, res) =>{
    res.send("Gracias!");
})


app.listen(port, ()=> {console.log(chalk.bgGreen.yellow('Server up'))});