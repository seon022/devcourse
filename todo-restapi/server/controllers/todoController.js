const Todo = require("../models/Todo");
const { v4: uuidv4 } = require("uuid");

exports.hello = (request, response) => {
    response.send("안녕 node.js");
};

exports.getTodos = async (request, response) => {
    try {
        const todos = await Todo.find();
        response.json(todos);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.addNewTodo = async (request, response) => {
    const newTodo = new Todo({
        id: uuidv4(),
        text: request.body.text,
        status: false,
    });

    try {
        const savedTodo = await newTodo.save();
        response.status(201).json(savedTodo);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

exports.updateTodo = async (request, response) => {
    try {
        const todo = await Todo.findOne({
            id: request.params.id,
        });
        if (!todo) {
            return response.status(404).json({ message: "Todo not found" });
        }

        todo.status = request.body.status;
        const updatedTodo = await todo.save();
        response.json(updatedTodo);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

exports.deleteTodo = async (request, response) => {
    try {
        const result = await Todo.deleteOne({ id: request.params.id });

        if (result.deletedCount === 0) {
            return response.status(404).json({ message: "Todo not found" });
        }
        response.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
