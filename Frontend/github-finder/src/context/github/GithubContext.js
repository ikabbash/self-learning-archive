import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


// provider function
export const GithubProvider = ({children}) => {
    // no longer needed due to Reducers
    // const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(true)
    const initialState = {
        users: [],
        loading: false,
        // changed to false because we want to set it to true
        // right before we make a request
    }
    const [state, dispatch] = useReducer(githubReducer, initialState)


    // get search results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`
        ${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        // that should give us the data like login and avatar_url
        const {items} = await response.json()

        // no longer needed due to REDUCERS
        // setUsers(data)
        // setLoading(false)
        
        // dispatched to the Github REDUCERS
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Clear users from state
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

    // Set Loading for reducers
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })


    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext