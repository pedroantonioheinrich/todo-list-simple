import Task from "../database/db.js"

const plusBtn = document.querySelector('#plus-btn')
const ul = document.querySelector('#ul-list')
const pendingTasks = document.getElementById('element')
const clearAll = document.querySelector('#clear-ul')
const input = document.querySelector('#input')

let count = 0
pendingTasks.textContent = count

if(count < 0){
    count = 0
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

input.addEventListener('keydown', (evt) => {
    if (evt.key === "Enter") {
        const input = document.querySelector('#input')
        if (input.value === "") {
            return input.style.border = "2px solid rgba(255, 85, 85, 1)"
        } else {
            input.style.border = "2px solid rgba(129, 252, 125, 1)"

            const taskObj = {
                id: generateId(),
                text: input.value
            }
            Task.addNewTask(taskObj).then(() => {
                ul.innerHTML = "";
                carregarTarefas();
                input.value = "";
                pendingTasks.textContent = Task.taskCount();
            });
        }
        input.value = ""
        pendingTasks.textContent = Task.taskCount()
    }
})

plusBtn.addEventListener('click', () => {
    const input = document.querySelector('#input')
    if (input.value === "") {
        return input.style.border = "2px solid rgba(255, 85, 85, 1)"
    } else {
        input.style.border = "2px solid rgba(129, 252, 125, 1)"

        const taskObj = {
            id: generateId(),
            text: input.value
        }

        Task.addNewTask(taskObj)
        ul.innerHTML = ""
        chargeUlList()
        input.value = ""
        pendingTasks.textContent = Task.taskCount()
        console.log(Task.tasks)

    }
    input.value = ""
    pendingTasks.textContent = Task.taskCount()
})

clearAll.addEventListener('click', ()=>{
    ul.innerHTML = ""
    Task.removeAll()
    console.log(Task.tasks)
    pendingTasks.textContent = Task.taskCount()
    
})

const chargeUlList = () => {Task.tasks.forEach((obj)=>{
        const li = createElements('li')
        li.textContent = obj.text
        li.className = 'li-added'
    
        const removeBtn = createElements('button')
        removeBtn.textContent = 'x'
        removeBtn.className = 'delete-li'

        li.appendChild(removeBtn)
        ul.appendChild(li)
        pendingTasks.textContent = Task.taskCount()

        removeBtn.addEventListener('click', ()=>{
            Task.removeTaskById(obj.id)
            input.style.border = "1px solid rgba(255, 252, 60, 1)"
            ul.innerHTML = ""
            chargeUlList()
            console.log(obj.id)
            console.log(Task.tasks)
            pendingTasks.textContent = Task.taskCount()
        })
    
        
})}

