const query = require('../database/dbquerys');
const { verifyToken } = require('../firebase/firebase-Config');

const getAll = async (token) => {
    const decodeToken = await verifyToken(token)
    if(decodeToken){
        const uid = decodeToken.user_id
        return await query.getAll(uid);
    } else {
        return null
    }
   
}
const getTodo = async (id) => {
    return await query.getById(id);
}
const addTodo = async (task, token) => {
    const decodeToken = await verifyToken(token)
    if (decodeToken) {
        if (task.body.length <= 0) {
            return null
        }
        const uid = decodeToken.user_id
        const result = await query.add(task.body, false, uid)
        if (result > 0)
            return result
        else
            return null
    } else {
        return null
    }




}
const updateTodo = async (task, id,token) => {
    const decodeToken = await verifyToken(token)
    let result = 0
    if(decodeToken){
        if (task.body?.length >= 0) {
            result = await query.updateTodo(task.body, id)
    
        }
        if (task.status != null) {
            result = await query.changeStatus(task.status, id)
        }
        console.log("ress", result)
        if (result > 0)
    
            return result
        else
            return null
    } else {
        return false 
    }
    

}
const deleteTodo = async (id,token) => {
    const decodeToken = await verifyToken(token)
    if(decodeToken){
        const result = await query.deleteTodo(id)
        if (result > 0)
            return true
        else
            return false
    } else{
        return false
    }
  
}
const syncData = async (taskList,token) => {

    const decodeToken = await verifyToken(token)
    if(decodeToken){
    const uid = decodeToken.user_id
    const result = await query.syncData(taskList,uid)
    
    if (result)
        return true
    else
        return false
    }
}


module.exports = {
    getAll,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    syncData
}