import Task from "../database/db.js"
const plusBtn = document.querySelector('#plus-btn')
const ul = document.querySelector('#ul-list')
const pendingTasks = document.getElementById('element')
const clearAll = document.querySelector('#clear-ul')

let count = 0
pendingTasks.textContent = count

if(count < 0){
    count = 0
}

plusBtn.addEventListener('click', ()=>{
    const input = document.querySelector('#input')
    if(input.value === ""){
        return input.style.border = "2px solid rgba(255, 85, 85, 1)"
    }else{
        input.style.border = "2px solid rgba(129, 252, 125, 1)"

        const taskObj = {
            id: Task.tasks.length + 1,
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
            ul.removeChild(li)
            input.value = ""
            count = count - 1
            pendingTasks.textContent = count
            input.style.border = "1px solid rgba(255, 252, 60, 1)"
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

