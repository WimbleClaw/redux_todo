import todos from './TodoApp'
import { deepfreeze } from 'deep-freeze';

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: "ADD_TODO",
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};