const query = require('../database/dbquerys')

const getAll = async() =>{
    return await query.getAll();
}
const getTodo = async (id) =>{
    return await query.getById(id);
}
const addTodo = async (task) => {
    console.log("task",task)
    if(task.body.length <= 0){
        return null
    }

    const result = await query.add(task.body,task.status)
  
    if(result > 0)
        return result
    else 
        return null
    
}
const updateTodo = async (task,id) =>{
    let result = 0
    if(task.body?.length >= 0){
         result = await query.updateTodo(task.body,id)
       
    }
    if(task.status != null){
         result = await query.changeStatus(task.status,id)
    }
    console.log("ress",result)
    if(result > 0)
        
        return result
    else 
        return null
    
}
const deleteTodo = async (id) =>{
    const result = await query.deleteTodo(id)
    if(result >0)
        return true
    else 
        return false
}

module.exports = { 
    getAll,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}