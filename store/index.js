// 1} create store
// 2) get handle to store
// 3) listen for changes in store
// 4) update the state in store

function creatStore(reducer) {

    let state;
    let listeners = [];

    const getStore = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter( (l) => l!== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getStore,
        subscribe,
        dispatch
    }

}

function todos(state =[], actions) {
    if(actions.type === 'ADD_TODO') {
        state = state.concat(actions.toDo)
    }
    return state
}

let store = creatStore(todos)
store.subscribe( () => {
    console.log(" i am getting changed", store.getStore())
})

store.dispatch( {
    type: 'ADD_TODO',
    toDo : {
        id: 1,
        complet: false,
        name: 'Learn Redux'
    }
})
