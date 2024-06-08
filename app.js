const http = require('http');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server Request');
    console.log('just for test')

     res.setHeader('Content-Type', 'text/html');

     const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

     let basePath = '';

     switch(req.url) {
        case '/':
            basePath = createPath('index');
            break;
        case '/contacts':
            basePath = createPath('contacts');
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts')
            res.end()
        default:
            basePath = createPath('error');
            break;
     }
    
        fs.readFile(basePath, (err, data) => {
            if (err) {
                console.log(err);
                res.end()
            } else {
                res.write(data);
                res.end();
            }
        })
    
})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})