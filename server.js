// Создание сервера

const { error } = require('console');
const express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = express();

app.set('view engine', 'ejs')

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})

// Middleware
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(express.static(path.join(__dirname, 'styles')));

app.use((req, res, next) => {
    console.log(`path: ${req.path}`);
    console.log(`method: ${req.method}`);
    next();
})

app.use(express.static('styles'))

// Get запросы

 app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


app.get('/contacts', (req, res) => {
    const title = 'contacts'
    const contacts = [
        {name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk'},
        {name: 'Twitter', link: 'http://twitter.com/YauhenKavalchuk'},
        {name: 'Github', link: 'http://github.com/YauhenKavalchuk'}
    ]
    res.render(createPath('contacts'), {contacts, title})
})

app.get('/posts/:id', (req, res) => {
    const title = 'posts';
    res.render(createPath('posts'), {title})
})

app.get('/posts', (req, res) => {
    const title = 'posts'
    res.render(createPath('posts'), {title})
})

app.get('/post', (req, res) => {
    const title = 'post'
    res.render(createPath('post'), {title})
})

app.get('/add-post', (req, res) => {
    const title = 'add-post'
    res.render(createPath('add-post'), {title})
})

app.get('/about-us', (req, res) => {
    
    res.redirect('contacts')
})

app.use((req, res) => {
    const title = 'error';
    res.render(createPath('error'), {title})
})

