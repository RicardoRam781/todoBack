const express = require('express')
const router = express.Router()
const toDoController = require("../controllers /ToDoController")
const userController = require('../controllers /UserController')

//todo crud
router.route("/").get(toDoController.getAll)

router.route("/get").get(toDoController.getTodo)

router.route("/add").post(toDoController.addTodo) // /add/:id

router.route("/update/:id").put(toDoController.updateTodo) // /update/:id/:userId

router.route("/delete/:id").delete(toDoController.deleteTodo) // /delete/:id/:userId

router.route("/syncData").post(toDoController.syncData) 

//user enpoints

router.route("/add/user").post(userController.addUser)
router.route("/signUp").post()


module.exports = router;