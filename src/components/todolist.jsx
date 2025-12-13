import React, { useState } from 'react'
import '../components/todolist.css'

function TodoList() {

    const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"]);
    const [newtask, setNewTask] = useState('');

    const [completed, setComplete] = useState(["Task 4"]);

    function InputChange(event) {
        setNewTask(event.target.value);
    }
    function AddTask() {

        if(newtask.trim() !== ""){
            setTasks(t => [...t, newtask]);
            setNewTask("");
        }
    }
    function DeleteTask(index, listTarget, setTarget) {
        const updateTask = listTarget.filter((_, i) => i !== index);

        if(setTarget === "tasks"){
            setTasks(updateTask);
        }
        else{
            setComplete(updateTask);
        }
    }
    function ToggleComplete(index, target) {

        if(target === "tasks"){
            setComplete(t => [...t, tasks[index]]);
            const updateTask = tasks.filter((_, i) => i !== index);
            setTasks(updateTask);

        }
        else{
            setTasks(t => [...t, completed[index]]);
            const updateTask = completed.filter((_, i) => i !== index);
            setComplete(updateTask);
        }

    }
    function MoveTaskUp(index, target) {
        if(index == 0){return;}
        
        if(target == "tasks"){
            const updateTask = [...tasks];
            [updateTask[index], updateTask[index - 1]] = 
            [updateTask[index - 1], updateTask[index]];
            setTasks(updateTask);
        }
        else{
            const updateTask = [...completed];
            [updateTask[index], updateTask[index - 1]] = 
            [updateTask[index - 1], updateTask[index]];
            setComplete(updateTask);
        }
    }
    function MoveTaskDown(index, target) {
        if(target == "tasks" && index < tasks.length-1){
            const updateTask = [...tasks];
            [updateTask[index], updateTask[index + 1]] = 
            [updateTask[index + 1], updateTask[index]];
            setTasks(updateTask);
        }
        else if(index < completed.length-1){
            const updateTask = [...completed];
            [updateTask[index], updateTask[index + 1]] = 
            [updateTask[index + 1], updateTask[index]];
            setComplete(updateTask);
        }
    }

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

                <ol className='lst-tasks'>
                    {tasks.map((tasksI, index) => 
                        <li key={index}>
                            <span className='text'>{tasksI}</span>
                            <button
                                className='btn-toggle'
                                onClick={() => ToggleComplete(index, "tasks")}>
                                ✔
                            </button>
                            <button
                                className='btn-delete'
                                onClick={() => DeleteTask(index, tasks, "tasks")}>
                                ✕
                            </button>
                            <button
                                className='btn-mv-up'
                                onClick={() => MoveTaskUp(index, "tasks")}>
                                △
                            </button>
                            <button
                                className='btn-mv-down'
                                onClick={() => MoveTaskDown(index, "tasks")}>
                                ▽
                            </button>
                        </li>
                    )}
                </ol>

                
                <ol className='lst-completed'>
                    {completed.map((completedI, index) => 
                        <li key={index}>
                            <span className='text'>{completedI}</span>
                            <button
                                className='btn-toggle'
                                onClick={() => ToggleComplete(index)}>
                                ↺
                            </button>
                            <button
                                className='btn-delete'
                                onClick={() => DeleteTask(index, completed)}>
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