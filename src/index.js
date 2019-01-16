import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import React, { Component } from "react";
import { Provider } from 'react-redux'
import * as deepFreeze from 'deep-freeze';
import { connect } from 'react-redux'
import { combineReducers, createStore } from 'redux';
import todos from './todoReducer'
import visibilityFilter from './visibilityFilterReducer'
import AddToDo from './components/AddToDo'
import TodoList from './components/TodoList'
import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const TodoApp = () => (
    <div>
        <AddToDo />
        < VisibleTodoList />
        <Footer />
    </div>
)

render(
    <Provider store={createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())} >
        <TodoApp />
    </Provider>,
    document.getElementById('root')
)

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


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
