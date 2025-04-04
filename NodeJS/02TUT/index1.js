// Node's filesystem module (fs)
const fs = require('fs');

// instead of fs.readFile('./files/starter.txt', ..) which's hardcoded
const path = require('path');

// (err, data) => is a call back function (arrow function)
// utf8 converts the data to string
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    // throw stops the program and finds a catch to execute
    if (err) throw err;
    console.log(data);
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Content for reply.txt!', (err) => {
    // throw stops the program and finds a catch to execute
    if (err) throw err;
    console.log("Write complete!");
})

// Hello world is outputted first because NodeJS is asynchronus
// the console would still log even if the error happens
console.log("Hey!");

// process is already imported value in Nodejs
process.on('uncaughtException', err => {
    console.error(`THERE WAS AN ERROR: ${err}`);
    process.exit(1);
})



/* Other notes:
__dirname = C:\Users\Valdus\Desktop\Self-learning-archive\Backend\02TUT
Basically the location of where index.js is located

path.join(__dirname, 'files', 'files2', etc..)
Means path/to/files/files2/etc..

Tip: would be better to put fs.appendFile inside the arrow function
of writeFile because of the asynchronus, and it assures that it's appended
in the created file, not that the fs.appendFile creates the file

fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'rename.txt'))


*/