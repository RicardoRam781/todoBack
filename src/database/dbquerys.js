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

module.exports = {
    add,
    getAll,
    getById,
    updateTodo,
    changeStatus,
    deleteTodo
}

