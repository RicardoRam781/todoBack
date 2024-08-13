const express = require('express')
const router = express.Router()
const toDoController = require("../controllers /ToDoController")

router.route("/").get(toDoController.getAll)

router.route("/get/:id").get(toDoController.getTodo)

router.route("/add").post(toDoController.addTodo)

router.route("/update/:id").put(toDoController.updateTodo)

router.route("/delete/:id").delete(toDoController.deleteTodo)

module.exports = router;