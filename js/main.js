import Task from "../database/db"
const plusBtn = document.querySelector('#plus-btn')
const ul = document.querySelector('#ul-list')
const pendingTasks = document.getElementById('element')
const clearAll = document.querySelector('#clear-ul')
const input = document.querySelector('#input')

let count = 0
pendingTasks.textContent = Task.taskCount()

function generateId(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

input.addEventListener('keydown', (evt)=>{
    if(evt.key === "Enter"){
      const input = document.querySelector('#input')
        if(input.value === ""){
            return input.style.border = "2px solid rgba(255, 85, 85, 1)"
        }else{
            input.style.border = "2px solid rgba(129, 252, 125, 1)"

            const taskObj = {
                id: generateId(),
                text: input.value
            }
            Task.addNewTask(taskObj)
            ul.innerHTML = "";
            carregarTarefas();
            input.value = "";                
            pendingTasks.textContent = Task.taskCount();
            
        }
        input.value = ""
        pendingTasks.textContent = Task.taskCount()  
    }
})


plusBtn.addEventListener('click', () => {
    const input = document.querySelector('#input')
    if(input.value === ""){
        return input.style.border = "1px solid red"
    }else{
        input.style.border = "1px solid green"
        const li = document.createElement('li')
        li.textContent = input.value
        li.className = 'li-added'
    
        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'x'
        removeBtn.className = 'delete-li'
    
        removeBtn.addEventListener('click', ()=>{
            ul.removeChild(li)
            input.value = ""
            count = count - 1
            pendingTasks.textContent = count
        })
    
        li.appendChild(removeBtn)
        ul.appendChild(li)
        input.value = ""
        count = count + 1
        pendingTasks.textContent = count

    }
})

clearAll.addEventListener('click', ()=>{
    tasks = []

    
})

