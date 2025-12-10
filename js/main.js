import Task from "../database/db.js"
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

plusBtn.addEventListener('click', ()=>{
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
        ul.innerHTML = ""
        // chargeUlList()
        carregarTarefas()
        input.value = ""
        pendingTasks.textContent = Task.taskCount()
        console.log(Task.tasks)

    }
    input.value = ""
    pendingTasks.textContent = Task.taskCount()
})

function createElements(elementType){
    return document.createElement(elementType)
}

// const chargeUlList = () => {Task.tasks.forEach((obj)=>{
//         const li = createElements('li')
//         li.textContent = obj.text
//         li.className = 'li-added'
    
//         const removeBtn = createElements('button')
//         removeBtn.textContent = 'x'
//         removeBtn.className = 'delete-li'

//         li.appendChild(removeBtn)
//         ul.appendChild(li)
//         pendingTasks.textContent = Task.taskCount()

//         removeBtn.addEventListener('click', ()=>{
//             Task.removeTaskById(obj.id)
//             input.style.border = "1px solid rgba(255, 252, 60, 1)"
//             ul.innerHTML = ""
//             chargeUlList()
//             console.log(obj.id)
//             console.log(Task.tasks)
//             pendingTasks.textContent = Task.taskCount()
//         })
    
        
// })}


clearAll.addEventListener('click', () => {
    fetch('http://localhost:3000/tasks', { method: 'DELETE' })
    .then(() => {
      ul.innerHTML = "";
      carregarTarefas();
    });

    ul.innerHTML = ""
    Task.removeAll()  
    console.log(Task.tasks)  
    pendingTasks.textContent = Task.taskCount()
})

function carregarTarefas() {
  fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then(tasks => {
      ul.innerHTML = ''; // limpa antes de adicionar
      // Se for um único objeto, transforme em array
      const lista = Array.isArray(tasks) ? tasks : [tasks];

      lista.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.className = 'li-added';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.className = 'delete-li';

        removeBtn.addEventListener('click', () => {
            fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'DELETE' })
            .then(() => carregarTarefas());
            Task.removeTaskById(task.id);
            ul.innerHTML = "";
            carregarTarefas();
            pendingTasks.textContent = Task.taskCount();
        });

        li.appendChild(removeBtn);
        ul.appendChild(li);
        pendingTasks.textContent = lista.length;
});
    })
    .catch(err => console.error('Erro ao carregar tarefas:', err));
}

