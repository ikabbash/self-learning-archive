const githubReducer = (state, action) => {
    switch(action.type) {
        // dispatched from GithubContext
        case 'GET_USERS':
            return {
                // anything that's already in the state
                ...state,
                users: action.payload,
                loading: false,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'CLEAR_USERS':
            return {
                ...state,
                users: [],
            }
        default:
            return state
    }
}

export default githubReducer