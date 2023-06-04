import {createContext, useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // instead of using hard coded database ~
    useEffect(() => {
        fetchFeedback()
    }, [])
    // fetch feedback
    const fetchFeedback = async () => {
        // added proxy in the package.json so no need
        // to type http://localhost/whatever every time
        const response = await fetch (`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }
    // instead of using hard coded database ~

    // function taken from App.js
    const deleteFeedback = async (id) => {
        if(window.confirm('Sure you wanna delete?')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE' })

            // returns the array -1 the one we're deleting then re-set the feedback
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // function taken from App.js
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()
        
        // newFeedback.id = uuidv4() commented due to the block above
        // get the current feedback first (the ones that exist) using the spread operator '...'
        setFeedback([data, ...feedback])
        // console.log(newFeedback);
        // then it'll be added to the UI since it's all an array
    }

    // edit function
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // to update the feedback item after editing
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem)
        })
        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ?
        { ...item, ...data} : item))
    }

    // below add the functions so they can be accessed
    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext

// note: editFeedback is the function and feedbackEdit is the state (boolean)