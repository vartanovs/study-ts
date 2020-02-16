# Reducers + Flux = Redux

## Principles

1. Everything that changes in your application, including data and UI state, is contained in a single "state" or "state tree" object
2. The state tree is read only. To change state, dispatch an action - a plain JS object describing the change
3. The reducer is a pure function that takes previous state and an action being dispatched and returns the next state

Different reducers should be responsible for different parts of the state tree, combined with reducer composition.
Reducers are JS functions, can call other reducers to delegate parts of state they manage.

## Vocabulary

State - Minimal representation of the data in your application.
Action - Minimal representation of the change to the data. Requires a `type` property.

## Redux Methods

### Apply Middleware

* Pass the return value as the second argument of `createStore`

### Combine Reducers

* Accepts an object mapping state field names and the reducers managing them (todos: todosReducer)
* Returns the top level reducer that reflects the mapping provided

### Create Store

* Accepts a reducer and (optional) an initial state of persisted data and/or (optional) enhancer
* Returns the top level state that reflects the mapping in the reducer

## Store Methods

* store.getState() - Returns current state of the redux store
* store.dispatch(action) - Change the state of the applicaton
* store.subscribe(callback) - Register a callback to call on every dispatch