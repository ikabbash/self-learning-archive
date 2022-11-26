const redux = require('redux'); // now to implement the store
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = 'CAKE_ORDERED' // how Redux defines states
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

// action creator, returns the object
function orderCake() {
    // action, object with type property
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
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
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
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
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

// second argument is what we want to bind it to
const actions = bindActionCreators({ orderCake, restockCake}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

// if you are to dispatch after unsubscribe changes won't be visible
unsubscribe();