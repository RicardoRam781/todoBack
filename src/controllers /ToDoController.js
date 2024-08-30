

const toDoService = require("../services/toDoServices")

function getToken(req){
    return req.headers.authorization?.split('Bearer ')[1];
}

const getAll = async (req, res) => {
    const token = getToken(req)
    if(!token){
        res.status(401).json([])
    } else{
        const todoList = await toDoService.getAll(token)
        res.json((todoList))
    }
    
}
const getTodo = async (req, res) => {
    const todo = await toDoService.getTodo(req.params.id)
    res.json((todo))
}
const addTodo = async (req, res) => {
    const token = getToken(req)
    if(!token){
        res.status(401).json("You have to log in")
    }
    
        
        const todo = toDoService.addTodo(req.body, token)
        if (todo) {
            res.status(201).json("Created")
    
        } else {
            res.status(500).json("Internal error")
        }
    console.log("todo", todo)
    
}
const updateTodo = async (req, res) => {
    const token = getToken(req)
    if(!token){
        res.status(401).json('Not autorized')
    }
    const todoUpdate = await toDoService.updateTodo(req.body, req.params.id,token)
    if (todoUpdate) {
        res.status(204).send("updated")
    } else {
        res.status(500).send("Internal error")
    }
}
const deleteTodo = (req, res) => {
    const token = getToken(req)
    if(!token){
        res.status(401).json('Not autorized')
    }
    const todoDelete = toDoService.deleteTodo(req.params.id,token)
    if (todoDelete) {
        res.status(204).json("deleted")
    } else {
        res.status(500).json("Internal error")
    }
}

const syncData = (req, res) => {
    const token = getToken(req)
    if(!token){
        res.status(401).json('Not autorized')
    }
    const result = toDoService.syncData(req.body,token)
    if (result) {
        console.log("returning", 201)
        res.status(201)
    } else {
        res.status(500)
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