const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.hello);
router.get("/api/todos", todoController.getTodos);
router.post("/api/newtodo", todoController.addNewTodo);
router.put("/api/todo/:id", todoController.updateTodo);
router.delete("/api/todo/:id", todoController.deleteTodo);

module.exports = router;
