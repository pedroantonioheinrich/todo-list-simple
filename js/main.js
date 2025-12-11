import Task from "../database/db.js"


const plusBtn = document.querySelector('#plus-btn')
const ul = document.querySelector('#ul-list')
const pendingTasks = document.getElementById('element')
const clearAll = document.querySelector('#clear-ul')
const input = document.querySelector('#input')


pendingTasks.textContent = Task.taskCount(Task.tasks)

function generateId(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// input.addEventListener('keydown', (evt)=>{
//     if(evt.key === "Enter"){
//       const input = document.querySelector('#input')
//         if(input.value === ""){
//             return input.style.border = "2px solid rgba(255, 85, 85, 1)"
//         }else{
//             input.style.border = "2px solid rgba(129, 252, 125, 1)"

//             const taskObj = {
//                 id: generateId(),
//                 text: input.value
//             }
//             Task.addNewTask(taskObj)
//             ul.innerHTML = "";
//             input.value = "";                
//             pendingTasks.textContent = Task.taskCount();
            
            
//         }
//         input.value = ""
//         pendingTasks.textContent = Task.taskCount()  
//     }
// })


plusBtn.addEventListener('click', () => {
    const input = document.querySelector('#input')
    if(input.value === ""){
        return input.style.border = "1px solid red"
    }else{
        ul.innerHTML = "";
        input.style.border = "1px solid green"
        pendingTasks.textContent = Task.taskCount()
        const taskObj = {
            id: generateId(),
            text: input.value
        }
        Task.addNewTask(taskObj)
        
        const li = document.createElement('li')
        li.textContent = input.value
        li.className = 'li-added'
        
        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'x'
        removeBtn.className = 'delete-li'
        
        removeBtn.addEventListener('click', ()=>{
            Task.removeTaskById()
            ul.removeChild(li)
            pendingTasks.textContent = Task.taskCount()
        })
        
        input.value = ""; 
        li.appendChild(removeBtn)
        ul.appendChild(li)

             
                  
        pendingTasks.textContent = Task.taskCount();
        

    }
    pendingTasks.textContent = Task.taskCount()
})

clearAll.addEventListener('click', ()=>{
    ul.innerHTML = "";
    Task.removeAll()
    pendingTasks.textContent = Task.taskCount()
})

