const toDoService = require("../services/toDoServices")

const getAll = async (req,res) =>{
    const todoList = await toDoService.getAll()
    res.json((todoList))
}
const getTodo = async (req,res) =>{
    const todo = await toDoService.getTodo(req.params.id)
    res.json((todo))
}
const addTodo = (req,res) =>{
    console.log("reeq",req.body)
    const todo = toDoService.addTodo(req.body)
    console.log("todo", todo)
    if(todo){
        res.status(201).json("Created")
        
    } else{
        res.status(500).json("Internal error")
    }
}
const updateTodo = async (req,res) =>{
    const todoUpdate = await toDoService.updateTodo(req.body,req.params.id)
    if(todoUpdate){
        res.status(204).send("updated")
    }else{
        res.status(500).send("Internal error")
    }
}
const deleteTodo = (req,res) =>{
    const todoDelete = toDoService.deleteTodo(req.params.id)
    if(todoDelete){
        res.status(204).json("deleted")
    } else {
        res.status(500).json("Internal error")
    }
}

module.exports = { 
    getAll,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}