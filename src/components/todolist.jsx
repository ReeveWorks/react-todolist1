import React, { useState } from 'react'
import '../components/todolist.css'

function TodoList() {

    const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"]);
    const [newtask, setNewTask] = useState('');

    function InputChange(event) {
        setNewTask(event.target.value);
    }
    function AddTask() {

        if(newtask.trim() !== ""){
            setTasks(t => [...t, newtask]);
            setNewTask("");
        }
    }
    function DeleteTask(index) {
        const updateTask = tasks.filter((_, i) => i !== index);
        setTasks(updateTask);
    }
    function ToggleComplete(index) {}
    function MoveTaskUp(index) {
        if(index > 0){
            const updateTask = [...tasks];
            [updateTask[index], updateTask[index - 1]] = 
            [updateTask[index - 1], updateTask[index]];
            setTasks(updateTask);
        }
    }
    function MoveTaskDown(index) {
        if(index < tasks.length-1){
            const updateTask = [...tasks];
            [updateTask[index], updateTask[index + 1]] = 
            [updateTask[index + 1], updateTask[index]];
            setTasks(updateTask);
        }}

    return (
            <div className="to-do-list"> 
                <h1>To-Do-List</h1>
                <div>
                    <input
                        type='text'
                        placeholder='Enter a task...'
                        value={newtask}
                        onChange={InputChange}
                    />
                    <button 
                        className='btn-add'
                        onClick={AddTask}>ADD</button>
                </div>

                <ol>
                    {tasks.map((tasks, index) => 
                        <li key={index}>
                            <span className='text'>{tasks}</span>
                            <button
                                className='btn-delete'
                                onClick={() => DeleteTask(index)}>
                                ✕
                            </button>
                            <button
                                className='btn-mv-up'
                                onClick={() => MoveTaskUp(index)}>
                                △
                            </button>
                            <button
                                className='btn-mv-down'
                                onClick={() => MoveTaskDown(index)}>
                                ▽
                            </button>
                        </li>
                    )}
                </ol>
            </div>
    );
}

export default TodoList