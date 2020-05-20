const express = require('express');
const chalk = require('chalk');
const app = express();
let port = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

app.use('/assets', express.static('./public'));

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <link href="assets/style.css" type="text/css" rel="stylesheet" />
            </head>
            <body>
                <h1>Hello world!</h1>
            </body>
        </html>
    `);
    
    res.end();
});

app.get('/api', (req, res) => {
    res.json({fisrtname: 'Jhon', lastname: 'Doe'});
});


app.listen(port, ()=> {console.log(chalk.bgGreen.yellow('Server up'))});