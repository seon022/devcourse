import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const addItem = async (newItem) => {
    const response = await axios.post(
        "http://localhost:5006/api/newtodo",
        newItem
    );
    return response.data;
};

const UseMutationEx = () => {
    const queryClient = useQueryClient();
    const addItemMutation = useMutation({
        mutationFn: addItem,
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            console.log("Todo created succesfully: ", result);
        },
        onError: (error) => {
            console.error("Error creating todo: ", error);
        },
    });

    const sendData = () => {
        const newText = prompt("💛 새로운 할 일을 입력해주세용 💛");
        if (newText) {
            addItemMutation.mutate({
                text: newText,
            });
        }
    };
    return (
        <div className="addWrap">
            <h3>할 일 추가</h3>
            <button className="addBtn" onClick={sendData}>
                Add Todo
            </button>
        </div>
    );
};

export default UseMutationEx;
