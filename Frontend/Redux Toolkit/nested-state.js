const redux = require('redux')
// to solve nested sttate issue
const produce = require('immer').produce

const initialState = {
    name: "Vishwas",
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
    },
}

const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     adress: {
            //         ...state.address,
            //         street: action.payload,
            //     },
            // }
            return produce(state, (draft) => {
                // as if state is mutable
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer)
console.log('Initial state: ', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated state: ', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()