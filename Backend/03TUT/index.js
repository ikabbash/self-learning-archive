const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

console.log(format(new Date(), 'dd/MM/yyyy\tHH:mm:ss'));
console.log("Misery loves company");
console.log("\n", uuid());

/*

THIS TUTORIAL FOCUSES ON NODE MODULES

npm init -y command generates the following package.json file
{
    "name": "03tut",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}

run npm i date-fns then you have dependencies right below license
"dependencies": {
    "date-fns": "^2.29.3"
}
* <- means latest update of everything
^ <- means latest update of minor and patch
~ <- means latest update of patch only

npm install nodemon -D (-D means saves it as a dev dependency)

"scripts": {
    "start": "node index",
    "dev": "nodemon index"
}, then type npm run dev instead of npm start to use nodemon

*/