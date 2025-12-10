class Task{
    static tasks = []

    static addNewTask(taskObj){
        return this.tasks.push(taskObj)
    }

    static seeAllTasks(){
        return this.tasks
    }

    static getTaskById(id){
        
        this.tasks.find((e)=>{
            if(e.id === id){
                return e 
            }else{
                return "Task ID Not Found"
            }
        })
    }
}

export default Task