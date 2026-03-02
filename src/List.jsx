import React, { useState, useEffect } from "react";
import { Trash, Edit, ArrowUp, ArrowDown, Save } from "lucide-react";

function List(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [taskIndex, setTaskIndex] = useState(null);
    const [editTask, setEditTask] = useState("");

    useEffect(() => {fetch("http://localhost:3001/tasks")
        .then(res => res.json())
        .then(data => setTasks(data));
    }, []);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            const newTaskObj = { text: newTask };
            fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTaskObj)
        })
        .then(res => res.json())
        .then(data => {
            setTasks(prev => [...prev, data]);
            setNewTask("");
        });
    }
}

    // function deleteTask(index){
    //     const updatedTasks = tasks.filter((_,i) => i !== index)
    //     setTasks(updatedTasks);
    // }
    
    function deleteTask(id){
        fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE"})
        .then(() => {
            setTasks(prev => prev.filter(task => task.id !== id));
        });
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    function startEditing(index){
        setTaskIndex(index);
        setEditTask(tasks[index].text);
    }

    // function saveTask(){
    //     setTasks(t => t.map((task, i) => i === taskIndex ? editTask : task));
    //     setTaskIndex(null);
    // }

    function saveTask(){
    const updatedTask = { ...tasks[taskIndex], text: editTask };
    fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedTask)
    })
    .then(res => res.json())
    .then(data => {
        setTasks(prev =>
            prev.map((task, i) =>
                i === taskIndex ? data : task
        )
    );
        setTaskIndex(null);
    });
}

    return(
        <div className="min-h-full rounded-2xl flex items-center justify-center bg-linear-to-br from-white to-blue-600 p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-800">Tasks for the day</h1>
                    <p className="text-blue-600 mt-2 font-medium">{tasks.length} tasks</p>
                </div>
                
                <div className="flex items-center mb-6">
                    <input type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange} className="flex-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 bg-transparent"/>
                    <button onClick={addTask} className="ml-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"> <strong> + </strong></button>
                </div>
                
                <ol className="space-y-5">{tasks.map((task, index) => (
                    <li key={task.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4 flex-1">
                            
                            <button onClick={() => deleteTask(task.id)} className="text-red-500 text-sm hover:scale-110 transition"><Trash size={18}/></button>
                            {taskIndex === index 
                                ? 
                                (<input className="flex-1 border-b border-gray-400 focus:outline-none py-1" value={editTask} onChange={(e) => setEditTask(e.target.value)}/>) 
                                :
                                (<span className="flex-1 text-gray-800 border-b border-gray-200 pb-1"> {task.text} </span>)
                            }
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition">
                            <button onClick={() => moveTaskUp(index)} className="text-green-600 text-sm hover:scale-110 transition"><ArrowUp size={18}/></button>
                            <button onClick={() => moveTaskDown(index)} className="text-red-600 text-sm hover:scale-110 transition"><ArrowDown size={18} /></button>
                            <button onClick={() => startEditing(index)} className="text-gray-600 text-sm hover:scale-110 transition"><Edit size={18}/></button>
                            <button onClick={saveTask} className="text-blue-600 text-sm hover:scale-110 transition"><Save size={18}/></button>
                        </div>
                    </li>
                ))}
            </ol>
            </div>
        </div>
    );
}

export default List

 // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            // <div className="w-full max-w-xl bg-gray-300 shadow-lg rounded-xl p-6">
            //     <h1 className="text-3xl font-bold text-center mb-5">To-Do List</h1>
            //     <div className="my-2 mb-4 items-center justify-center flex">
            //         <input className=" border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 mx-2 rounded-2xl w-75 h-10 px-2" type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange} />
            //         <button className="px-5 py-2 rounded bg-green-500 hover:scale-110 hover:bg-green-600 transition" onClick={addTask}>Add</button>
            //     </div>
            //     <ol>
            //         {tasks.map((task, index) => 
            //         <li className="my-2 p-2 flex mx-[7%]" key={index}>
            //             {taskIndex === index ?  
            //                 (<input className="mx-2 py-2 px-4 border rounded-2xl flex-1"value={editTask} onChange={(e) => setEditTask(e.target.value)}/>)
            //                 :(<span className="mx-2 py-2 px-4 border bg-gray-200 border-gray-400 flex-1 rounded-2xl">{task}</span>)
            //             }
            //             <div className="items-center flex justify-center">
            //                 <button className="mx-2 px-2 py-2 rounded bg-red-500 hover:scale-110 hover:bg-red-600 transition" onClick={() => deleteTask(index)}>Delete</button>
            //                 <button className="mx-2 text-2xl hover:scale-110 transition" onClick={() => moveTaskUp(index)}>👆</button>
            //                 <button className="text-2xl hover:scale-110 transition" onClick={() => moveTaskDown(index)}>👇</button>
            //                 <button className="mx-2 text-2xl hover:scale-110 transition" onClick={() => startEditing(index)}>✏️</button>
            //                 <button className="mx-2 text-2xl hover:scale-110 transition" onClick={saveTask}>💾</button>
            //             </div>
            //         </li>)}
            //     </ol>
            // </div>
        // </div>