const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfCakes: 10
}

// createSlice automatically generates action creators
// with the same names as the reducers functions we wrote
const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfCakes--
        },
        restocked: (state, action) => {
            state.numOfCakes += action.payload
        }
    }
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions