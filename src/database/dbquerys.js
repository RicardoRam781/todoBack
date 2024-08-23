const pool = require("./db")

async function add(body,status){
   const result = await pool.query(`INSERT INTO todo (body,status) VALUES ($1,$2)`,[body, status])
   console.log("rowcount", result.rowCount)
   return result.rowCount
}

async function getAll(){
    const result = await pool.query('SELECT * FROM todo ORDER BY id DESC')
    return result.rows
}
async function getById(id){
    const result = await pool.query('SELECT * FROM todo WHERE id = $1',[id])
    return result.rows
}

async function updateTodo(body,id){
    const result = await pool.query(`UPDATE todo SET body = $1 WHERE id = $2`,[body,id])
   return result.rowCount
}
async function changeStatus(status,id){
    const result = await pool.query('UPDATE todo SET status = $1 WHERE id = $2',[status,id])
    return result.rowCount
}

async function deleteTodo(id){
    const result = await pool.query("DELETE FROM todo WHERE id = $1", [id])
    return result.rowCount
}

async function syncData(taskList){
    const todosInDb = await getAll();
    const idToSave = [];
    
    taskList.map((item) =>{
        todosInDb.map((element) => {
            if(item.id == element.id){
                if(item?.body != element.body){
                    element.body = item.body
                    

                } else if(item.status != element.status){
                    element.status = item.status
                    
                }
                idToSave.push(item.id)
            } 
           
        });
        
    }) 
    let idToDelete =  todosInDb.filter(element => !idToSave.includes(element.id))
    let taskToAdd = taskList.filter(task =>
        !todosInDb.some(res => res.id === task.id)
      );
      if(taskToAdd.length > 0){
        taskToAdd.map(async (element )=> {
            await add(element.body, false)
        });
        
      }
   
   if(idToDelete.length >0){
    idToDelete.map(async (item) => {
        await deleteTodo(item.id)
    }) 
   }
    todosInDb.map(async (item,index) =>{
        let result = await pool.query('UPDATE todo SET body = $1, status = $2 WHERE id = $3',[item.body, item.status, item.id])
    })
    return true

    //console.log("RESULT",todosInDb,"TASKLIST", taskList,"IDSave", idToSave)    
}

module.exports = {
    add,
    getAll,
    getById,
    updateTodo,
    changeStatus,
    deleteTodo,
    syncData
}

