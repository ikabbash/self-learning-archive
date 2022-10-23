// to prevent the callback hell (for example append inside of write,
// then rename inside and so on)
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n Hello from append!');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'renamed.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'renamed.txt'), 'utf8');
        console.log(newData);
    
    } catch (err) {
        console.error(err)
    }
}

fileOps();

// fsPromoises.unlink deletes files