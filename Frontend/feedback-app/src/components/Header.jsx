import PropTypes from 'prop-types'

// passed from App.js, props
function Header({ text, bgColor, textColor }) {
const headerStyles = {
    backgroundColor: bgColor,
    color: textColor
}
  return (
    <header style={headerStyles}>
        <div className="container">
            <h2>{text}</h2>
        </div>
    </header>
  )
}

Header.defaultProps = {
    text: 'Feedback UI',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

// if you type a different value than string in App.js
// it'll give an error, because it's restricted to string
// to make the application more robust
Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}

export default Header