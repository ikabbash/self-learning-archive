import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
// import {useState} from 'react'
// import FeedbackData from "./data/FeedbackData"
import FeedbackStats  from "./components/FeedbackStats"
import FeedbackForm  from "./components/FeedbackForm"
// npm i uuid to give each feedback a unique id

// -> import Card from "./components/shared/Card"
// then insert <Card>Hello world</Card> inside

// routing
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import AboutIconLink from "./components/AboutIconLink"

// context
import {FeedbackProvider} from './context/FeedbackContext'
// React context allows us to pass down and use (consume)
// data in whatever component we need in our React app without using props
// You can think of React context as the equivalent of global variables for our React components


//////////////////////////////////////
function App() {
    // JSON file of already existing feedback
    // const [feedback, setFeedback] = useState(FeedbackData)
    // commented now since context is being used

    return (
    // global functions in App.js to be used in other components like delete or add feedback
    // handleAdd or deleteFeedback are passed as props
    <FeedbackProvider>
    <Router>
        <Header />
        <div className="container">
        <Routes>
        <Route exact path='/' element={
            <>
            <FeedbackForm />
            <FeedbackStats />
            <FeedbackList />
            </>
        }>
        </Route>
            
        <Route path='/about' element={<AboutPage />}/>
        </Routes>
        <AboutIconLink />
        </div>
    </Router>
    </FeedbackProvider>   
    )
}

// feedback={feedback} is a prop
// you need to pass a prop so you can catch it as an argument
// from the other program "Header.jsx"

export default App