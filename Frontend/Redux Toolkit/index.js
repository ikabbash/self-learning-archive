const redux = require('redux'); // now to implement the store
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED' // how Redux defines states

// action creator, returns the object
function orderCake() {
    // action, object with type property
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

const initialState = {
    // assume every morning there are 10 cakes on the shelf
    numOfCakes: 10,
    anotherProperty: 0
}

// Reducer: (previousState, action) => newState
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                // copy state object
                // then only update numOfCakes
                // so we don't change anotherProperty
                ...state,
                numOfCakes: state.numOfCakes -1,
            }
        default:
            return state
    }
}

// store steps
const store = createStore(reducer)
console.log('Initial state:', store.getState())
// unsubscribe is the final step
const unsubscribe = store.subscribe (() => console.log('Update state: ', store.getState()))
// action creator
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

// if you are to dispatch after unsubscribe changes won't be visible
unsubscribe();