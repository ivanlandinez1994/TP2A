const express = require('express');
const chalk = require('chalk');

const app = express();
let port = 3000;

app.get('/',(req, res)=>{
    res.send(`
        <html>
            <head>            </head>
            <body>
                <h1> hi : ${req.query.name}</h1>
            </body>
        </html>
    `);
})
app.listen(port, () => {console.log(chalk.bgGreen("server available"))});
