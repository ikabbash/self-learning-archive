const logEvents = require('./logEvents')
const { v4: uuid } = require('uuid')

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// initialize object
// remember that MyEmitter class inherits from EventEmitter
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));
setTimeout(() => {
    //Emit event
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);


// simpler way to understand emitters
const customEmitter = new EventEmitter()
customEmitter.on('response', (name, id) => {
    console.log(`data received with user ${name} and ID: ${id}`)
})
customEmitter.emit('response', 'Ibrahim', uuid())
// if the emit is response, then whatever in customEmitter.on will be executed
// if the emitter code was put before the .on code, it won't be detected hence won't be executed