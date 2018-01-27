const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('capitalize', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n');
    console.log(log);  
    next();
});
app.use((req, res, next) => {
    res.render('maintenence.hbs');
});

app.get('/',(req, res) => {
    // res.send('<h1>GOT IT>>>>EXPRESSSSSSSSSSSSS....</h1>');
    res.render('home.hbs',{
        title: 'Home page',
    })
});

app.get('/about',(req, res) => {
    // res.send('<h1>Page 2....</h1>');
       res.render('about.hbs', {
           title: 'About Page',
       });
});

app.get('/error',(req, res) => {
    res.send({error: '404'});
});

app.listen(3000, () => {
    console.log('App started listening at port 3000');
});
