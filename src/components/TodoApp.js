import React, { Component } from "react";
import { Provider } from 'react-redux'
import * as deepFreeze from 'deep-freeze';
import { connect } from 'react-redux'
import { combineReducers, createStore } from 'redux';
import ReactDOM from 'react-dom'

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
}

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

// const combineReducer = (reducers) => {
//     return (state = {}, action) => {
//         return Object.keys(reducers).reduce(
//             (nextState, key) => {
//                 nextState[key] = reducers[key](
//                     state[key],
//                     action
//                 );
//                 return nextState;
//             },
//             {}
//         )
//     }
// };

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

let nextTodoId = 0;
const addToDo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    };
}

const setVisiblityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
}

const Link = ({
    active,
    children,
    onClick
}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
}

const mapStateToLinkProps = (
    state, ownProps
) => {
    return {
        active:
            ownProps.filter === state.visibilityFilter
    };
};

const mapDispatchToLinkProps = (
    dispatch,
    ownProps
) => {
    return {
        onClick: () => {
            dispatch(
                setVisiblityFilter(ownProps.filter)
            )
        }
    }
}

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link)

const Footer = () => {
    return (
        <p>
            show: {' '}
            <FilterLink
                filter='SHOW_ALL'
            >
                All
                    </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_ACTIVE'
            >
                Active
                    </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_COMPLETED'
            >
                Completed
                    </FilterLink>
        </p>
    )
}

const Todo = ({
    onClick,
    completed,
    text
}) => (<li
    onClick={onClick}
    style={{
        textDecoration:
            todo.completed ? 'line-through' : 'none'
    }}>
    {text}
</li>
    );

const TodoList = ({
    todos,
    onTodoClick
}) => (
        <ul>
            {todos.map(todo =>
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => onTodoClick(todo.id)}
                />
            )}
        </ul>
    );



let AddToDo = ({ dispatch }) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                dispatch(addToDo(input.value));
                this.input.value = '';
            }}>
                Add Todo
                </button>
        </div>
    );
};
AddToDo = connect()(AddToDo);

const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            )
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

const mapStatetoTodoProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};
const mapDispatchToTodoProps = (dispatch) => {
    return {
        OnTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    };
}
const VisibileTodoList = connect(
    mapStatetoTodoProps,
    mapDispatchToTodoProps
)(TodoList);




const TodoApp = () => (
    <div>
        <AddToDo />
        < VisibileTodoList />
        <Footer />
    </div>
)
export default TodoApp



// const todoApp = (state = {}, action) => {
//     return {
//         todos: todo(
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter, action
//         )
//     };
// }



// const testAddTodo = () => {
//     const stateBefore = [];
//     const action = {
//         type: "ADD_TODO",
//         id: 0,
//         text: 'Learn Redux'
//     };
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         }
//     ];

//     deepFreeze(stateBefore);
//     deepFreeze(action);

//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter);
// };

// const testToggleTodo = () => {
//     const stateBefore = [
//         {
//             id: 0,
//             text: 'learn Redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'Go Shopping',
//             completed: false
//         }
//     ];
//     const action = {
//         type: 'TOGGLE_TODO',
//         id: 1
//     };

//     const stateAfter = [
//         {
//             id: 0,
//             text: 'learn Redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'Go Shopping',
//             completed: true
//         }
//     ];

//     deepFreeze(stateBefore);
//     deepFreeze(action);

//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter);
// }

// testAddTodo();
// testToggleTodo();
// console.log('All tests have passed')