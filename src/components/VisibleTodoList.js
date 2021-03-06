import { connect } from 'react-redux'
import TodoList from './TodoList'

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

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
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
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    };
}

const VisibleTodoList = connect(
    mapStatetoTodoProps,
    mapDispatchToTodoProps
)(TodoList);
export default VisibleTodoList