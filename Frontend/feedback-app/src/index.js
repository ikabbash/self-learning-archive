// The entry point of React is in the div.root in the public's HTML file
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

// 4th, styling
import './index.css'

// 3rd
import App from './App'

// Takes two things, first the main app component
// second argument is where we want to put this
// ReactDOM.render(<h1>My App</h1>, document.getElementById('root'));

// display the App component
ReactDOM.render(
    // Strictmode adds additional checks and warnings
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('root')
);