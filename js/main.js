
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

