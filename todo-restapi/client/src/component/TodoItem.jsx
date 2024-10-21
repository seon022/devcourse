import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const TodoItem = ({ todo }) => {
    const queryClient = useQueryClient();

    const updateTodoStatus = async (todo) => {
        const response = await axios.put(
            `http://localhost:5006/api/todo/${todo.id}`,
            { status: !todo.status }
        );
        return response.data;
    };

    const deleteTodo = async (todo) => {
        const response = await axios.delete(
            `http://localhost:5006/api/todo/${todo.id}`
        );
        return todo;
    };

    const updateTodoMutation = useMutation({
        mutationFn: updateTodoStatus,
        onSuccess: (result) => {
            console.log("status updated : ", result);
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error) => {
            console.error("Error adding item : ", error);
            alert("Failed to add item. Please try again.");
        },
    });
    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (result) => {
            console.log("item deleted : ", result);
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error) => {
            console.error("Error adding item : ", error);
            alert("Failed to delete item. Please try again.");
        },
    });
    const handleCheckbox = (todo) => {
        updateTodoMutation.mutate(todo);
    };
    const handleDelete = (item) => {
        deleteTodoMutation.mutate(item);
    };
    return (
        <li className="todoItem">
            <label htmlFor={todo.id}>
                <input
                    type="checkbox"
                    id={todo.id}
                    checked={todo.status}
                    onChange={() => handleCheckbox(todo)}
                />
                {todo.text}
            </label>
            <button onClick={() => handleDelete(todo)}>❌</button>
        </li>
    );
};

export default TodoItem;
