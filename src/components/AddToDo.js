import React from 'react'
import { connect } from 'react-redux'

let nextTodoId = 0;
const addToDo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    };
}

const AddToDo = ({ dispatch }) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                dispatch(addToDo(input.value));
                input.value = '';
            }}>
                Add Todo
                </button>
        </div>
    );
};
export default connect()(AddToDo);