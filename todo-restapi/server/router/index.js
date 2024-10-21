const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/", (request, response) => {
    response.send("Hello Node.js");
});

let todoList = [
    { id: "1", text: "리액트 기초 공부하기", status: false },
    { id: "2", text: "취업 준비하기", status: false },
    { id: "3", text: "여행가기", status: true },
];
router.get("/api/todo", (request, response) => {
    response.json(todoList);
});

// POST 요청 처리하기
router.post("/api/add", (request, response) => {
    console.log(todoList.length);
    console.log(request.body.text);

    const newItem = {
        id: uuidv4(),
        text: request.body.text,
        status: false,
    };
    todoList.push(newItem);
    response.send(newItem);
});

// PUT요청 UPDATE
router.put("/api/todo/:id", (request, response) => {
    // params ~ :id 자리
    const id = request.params.id;
    const status = request.body.status;

    // todoList에서 해당 id가진 항목 찾기
    const todoIndex = todoList.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
        // 찾지 못한 경우
        return response.status(404).json({ message: "Todo not found" });
    }
    // status값 새 값으로 업데이트
    todoList[todoIndex].status = status;

    // 업데이트된 todo항목을 클라이언트에게 전송
    response.send(todoList[todoIndex]);
});

// DELETE 요청 처리
router.delete("/api/todo/:id", (request, response) => {
    // params ~ :id 자리
    const id = request.params.id;
    if (todoIndex === -1) {
        // 찾지 못한 경우
        return response.status(404).json({ message: "Todo not found" });
    }

    todoList = todoList.filter((item) => item.id !== id);
    response.status(200).json({ message: "Todo deleted successfully" });
});

module.exports = router;
