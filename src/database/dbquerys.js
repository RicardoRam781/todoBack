const pool = require("./db")

async function add(body,status,uid){
   const user_id = await getUser(uid) 
   const result = await pool.query(`INSERT INTO todo (body,status,id_user) VALUES ($1,$2,$3)`,[body, status, user_id])
   console.log("rowcount", result.rows)
   return result.rowCount
}

async function getAll(uid){
    const user_id = await getUser(uid) 
    const result = await pool.query('SELECT * FROM todo WHERE id_user = $1 ORDER BY id DESC',[user_id])
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

async function syncData(taskList,uid){
   // const userId = await getUser(uid);
    const todosInDb = await getAll(uid);
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
        console.log("RESUTL AFTER TASKLIST", todosInDb)
        
    }) 
    let idToDelete =  todosInDb.filter(element => !idToSave.includes(element.id))
    let taskToAdd = taskList.filter(task =>
        !todosInDb.some(res => res.id === task.id)
      );
      if(taskToAdd.length > 0){
        taskToAdd.map(async (element )=> {
    
            await add(element.body, false, uid)
        });
        
      }
   
   if(idToDelete.length >0){
    idToDelete.map(async (item) => {
        console.log("deleting")
        await deleteTodo(item.id)
    }) 
   }
    todosInDb.map(async (item,index) =>{
        let result = await pool.query('UPDATE todo SET body = $1, status = $2 WHERE id = $3',[item.body, item.status, item.id])
        console.log("afectadas",result.rowCount)
    })
    console.log("RESULT",todosInDb,"TASKLIST", taskList,"IDSave", idToSave) 
    return true

       
}

async function getUser(uid){
    const result = await pool.query("SELECT id FROM users WHERE uid = $1",[uid])
    console.log("USER ID", result.rows)
    return result?.rows[0]?.id
}

async function addUser(uid, email){
   const id =  await getUser(uid)
    if(!id){
        const result = await pool.query('INSERT INTO users (uid, email) VALUES ($1,$2)',[uid,email])
        return result.rowCount
    } else {
        console.log("user registred")
        return id 
    }
    
    
}



module.exports = {
    add,
    getAll,
    getById,
    updateTodo,
    changeStatus,
    deleteTodo,
    syncData,
    addUser
}

