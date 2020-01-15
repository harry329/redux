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
        return state.concat(actions.toDo)
    } else if (actions.type === 'REMOVE_TODO') {
        return state.filter( (todo) => todo.id !== actions.id)
    } else if (actions.type === 'TOGGLE_TODO') {
        return state.map( (todo) => if (todo.id !== actions.id) ? todo : Object.assign({}, todo, complete : !todo.complete) )
    } else {
        return state
    }

}

function goals(state=[], action) {
    switch (action.type) {
        case 'ADD_GOAL' :
            return state.concat(action.goal)
        case 'REMOVE_GOAL' :
            return state.filter((goal) => goal.id !== action.goal)
        default:
            return state
    }
}

function app (state = {}, action) {
    return {
        todos : todos(state.todos, action),
        goals : goals(state.goals, action)
    }

}

let store = creatStore(app)
store.subscribe( () => {
    console.log(" i am getting changed", store.getStore())
})

store.dispatch( {
    type: 'ADD_TODO',
    toDo : {
        id: 1,
        complete: false,
        name: 'Learn Redux'
    }
})
