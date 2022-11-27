const createSlice = require('@reduxjs/toolkit').createSlice
const { cakeActions } = require('../cake/cakeSlice')

const initialState = {
    numOfIcecream: 20
}

// createSlice automatically generates action creators
// with the same names as the reducers functions we wrote
const icecreamSlice = createSlice({
    name: 'icecream',
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfIcecream--
        },
        restocked: (state, action) => {
            state.numOfIcecream += action.payload
        },
    },
    // will be triggered automatically
    // extraReducers: {
    //     ['cake/ordered']: (state) => {
    //         state.numOfIcecream--
    //     }
    // }
    // recommended approach
    extraReducers: (builder) => {
        builder.addCase(cakeActions.ordered, state => {
            state.numOfIcecream--
        })
    }
})

module.exports = icecreamSlice.reducer
module.exports.icecreamActions = icecreamSlice.actions