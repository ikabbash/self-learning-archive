const redux = require('redux'); // now to implement the store
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const applyMiddleware = redux.applyMiddleware
// Redux's logger middleware (for things like logging)
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED' // how Redux defines states
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

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

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}
function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// const initialState = {
//     // assume every morning there are 10 cakes on the shelf
//     numOfCakes: 10,
//     numOfIceCreams: 20,
// }

const initialCakeState = {
    numOfCakes: 10
}
const initialIceCreamState = {
    numOfIceCreams: 20
}

// Reducer: (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}

// store can only handle one reducer, solution is to combine
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state:', store.getState())
// unsubscribe is the final step
const unsubscribe = store.subscribe (() => {})

// second argument is what we want to bind it to
const actions = bindActionCreators({ orderCake, restockCake,
orderIceCream, restockIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)

// if you are to dispatch after unsubscribe changes won't be visible
unsubscribe();