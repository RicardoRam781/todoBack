const express = require('express')
const router = express.Router()
const toDoController = require("../controllers /ToDoController")

//todo crud
router.route("/").get(toDoController.getAll)

router.route("/get/:id").get(toDoController.getTodo)

router.route("/add").post(toDoController.addTodo)

router.route("/update/:id").put(toDoController.updateTodo)

router.route("/delete/:id").delete(toDoController.deleteTodo)

router.route("/syncData").post(toDoController.syncData)

//user enpoints

router.route("/add/user").post()
router.route("/signUp").post()


module.exports = router;