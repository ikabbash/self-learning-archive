// CommonJS modules are used instead of ES6 modules
// NodeJS runs on a server not in a browser (backend not frontend)
// Global object inbstead of a window object
// Missing some JS APIs like fetch

const math = require('./math')
const { multiply } = require('./math')

console.log(math.add(2, 3))
console.log(multiply(2, 3))