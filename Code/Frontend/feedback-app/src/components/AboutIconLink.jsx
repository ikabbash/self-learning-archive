import React from 'react'
import {FaQuestion} from 'react-icons/fa'
import {Link} from 'react-router-dom'
// use linking instead of the <a> tag because it refreshes the page
// only use <a> tag when you're going somewhere off site

function AboutIconLink() {
    return (
        <div className="about-link">
            <Link to='/about'>
            <FaQuestion size={30} />
            </Link>
        </div>    
    )
}

export default AboutIconLink