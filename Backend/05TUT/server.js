const logEvents = require('./logEvents');
const EventEmitter = require('events');
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : '');
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            {'Content-Type': contentType });
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}\t${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method); // o/p example: / GET
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');


    const extension = path.extname(req.url); // like .html, .txt, etc..
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        // in case path is root for example
        default:
            contentType = 'text/html';
    }

    // chain ternary statement
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    // could be css or an image if none of the other were true
                    : path.join(__dirname, req.url);
    
    // makes the .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';


    // HANDLING REDIRECTS
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        // serve file
        serveFile(filePath, contentType, res);
    } else {
        // 404 or 301 redirect
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
            // serve 404
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
})
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*
Inefficient version inside http.createServer:

let path;
if (req.url === '/' || req.url === 'index.html'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    path = path.join(__dirname, 'views', 'index.html');
    fs.readFile(path, 'utf8', (err, data) => {
        res.end(data);
    });
}

*/