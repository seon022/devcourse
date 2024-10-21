import React from "react";
import { useQuery } from "react-query";
import TodoItem from "./TodoItem";
import UseMutationEx from "./UseMutationEx";

const fetchTodo = () => {
    return fetch("http://localhost:5006/api/todos").then((response) =>
        response.json()
    );
};
const TodoFetchingNode = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodo,
    });

    // 로딩상태 처리
    if (isLoading)
        return (
            <div className="loadingWrap">
                <div className="spinner"></div>

                {/* react-spinners */}
                {/* <PacmanLoader color="#ff00c8" size={30} /> */}
            </div>
        );

    // 에러 상태 처리
    if (error) return <div>An error occurred : {error.message}</div>;

    return (
        <div className="todoWrap">
            <h1>이번 주 할 일 리스트</h1>
            <ul className="todoList">
                {data.map((todo, idx) => (
                    <TodoItem key={idx} todo={todo} />
                ))}
            </ul>
            <UseMutationEx />
        </div>
    );
};

export default TodoFetchingNode;
