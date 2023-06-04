import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from './shared/Card'
import PropTypes from 'prop-types'

import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackItem({item}) {
    // what the function returns = default
    // name of state, function of state
    
    // to delete the item, it's located in App.js which's located in FeedbackList
    // const handleClick = (id) => {
    //     console.log(id);
    // }
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

    return (
        <Card reverse={true}>
            <div className="num-display">{item.rating}</div>
            <button onClick={() => deleteFeedback(item.id)} className="close">
                <FaTimes color='purple'></FaTimes>
            </button>
            <button onClick={() => editFeedback(item)
            } className="edit">
                <FaEdit color='purple' />
            </button>
            <div className="text-display">{item.text}</div>
        </Card>
    )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default FeedbackItem


// built-in React object that is used to contain data or
// information about the component. A component's state
//can change over time; whenever it changes, the component re-renders
// <div className="text-display">{text}</div> output of a state
// {} <- when it's in HTML, it's Javascript code