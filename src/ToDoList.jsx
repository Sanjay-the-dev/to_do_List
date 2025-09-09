import React,{useState , useEffect} from "react";


function ToDoLIst(){

    const [task, settask]= useState(()=> {
        const savedTask = localStorage.getItem("tasks");
        return savedTask? JSON.parse(savedTask): ["Wakeup" , "Brush" , "Shower" ];
        
    });
    const [newTask, setNewTask] = useState("");


    useEffect(()=>{

        localStorage.setItem("tasks",JSON.stringify(task));

    },[task])

    function AddBtn(){

        if(newTask.trim() !== ""){

            settask(prev =>[...prev,newTask.trim()]);
        }
        setNewTask("");
    }

    function clearTasks(){
        settask([])
    }
    function deleteTask(index){

        settask(prev => prev.filter((items, i)=> i !== index))
    }

    function moveTaskUp(index){

        if(index >0){
            const updateUp = [...task];

            [updateUp[index], updateUp[index-1] ] = [updateUp[index -1], updateUp[index]];

            settask(updateUp);
        }
    }
    function moveTaskDown(index){

        if (index < task.length - 1){

        const updateDown = [...task];

        [updateDown[index], updateDown[index+1]] = [updateDown[index+1], updateDown[index ]];

        settask(updateDown);
        }


    }
    
    return(
    <div className="ToDoListContainer">



        <h1>To Do List</h1>

        <div className="inputArea">
        <input type="text" placeholder="Enter a Task"   id="InputBox" value={newTask} onChange={(e)=>setNewTask(e.target.value )}  /> 

        <button className="AddBtn" onClick={()=>{(AddBtn())}}>ADD</button>
        </div>

        <ul>
            <div className="taskHead">
             <p style={{display:"inline-block" , fontWeight:"500"}}>Tasks  </p>  
             <button onClick={clearTasks} className="clearBtn"> Clear</button> 
            </div>
            
            {task.map((items, index)=> <li key={index}> <span className="taskName">{items}</span> 
            <span className="listBtns">
            <button onClick={()=>deleteTask(index)}>❌</button>
            <button onClick={()=>moveTaskUp(index)}>🔼</button>
            <button onClick={()=>moveTaskDown(index)}>🔽</button>
            </span>
            </li>)}
        </ul>
        


    </div>)
}

export default ToDoLIst;

