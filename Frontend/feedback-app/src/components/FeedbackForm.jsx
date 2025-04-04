import React from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
// when you have a form you gonna have a piece of state
// for each input in that form
import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'

// function, where props are stored
function FeedbackForm() {
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

    // conditions when typing a review
    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length<=10){
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }

    // useEffect function so we can see a textbox and rating when editing
    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false) // enable button
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])
    // if the brackets were empty it would run only once on startup

    // when feedback is submitted
    const handleSubmit = (e) => {
        // to prevent submitting to the actual file
        e.preventDefault()
        // in case client is a smartass and used chrome tool to enable the button by force
        if(text.trim().length>10) {
            // json
            const newFeedback = {
                text,
                rating,
            }

            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
            // to clear text
            setText('')
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input onChange={handleTextChange}
                    type="text"
                    placeholder='Write a review'
                    value={text}
                    />
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm