// import * as React from "react";
import {Trash2, Edit, Save, X, CheckSquare, Square} from "lucide-react"
import type {TodoListProps} from "../types.ts";
import {useState} from "react";

const  TodoList = ({todos, dispatch}: TodoListProps) => {
    
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    
    const handleDelete = (id: number) => () => {
        dispatch({type: "DELETE", payload: id});
    }

    const handleEdit = (id: number, text: string) => () => {
        setEditId(id);
        setEditText(text);
    }

    const handleCancel = () => {
        setEditId(null);
        setEditText("");
    }

    const handleSave = (id: number) => () => {
        dispatch({ type: "EDIT", payload: { id, newText: editText} })
        setEditId((null))
        setEditText("")
    }

    const handleToggle = (id: number) => () => {
        dispatch({ type: "COMPLETE", payload: id})
    }

    return (
        <>
            <ul className="space-y-2">
                {todos.map(todo => (
                    <li key = {todo.id} className={`${todo.completed?"opacity-60 line-through decoration-check":""}
                    flex items-center justify-between bg-gray-icon p-2 rounded`}>
                        { editId === todo.id ? (
                            <>
                                <div className="flex flex-1 gap-2">
                                    <input type="text" value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="flex-1 border rounded p-1
                                        text-icon-text font-semibold border border-icon-text p-2 rounded flex-1 focus:outline-list-icon"
                                    />
                                    <button className="text-icon-text cursor-pointer"
                                            onClick={handleSave(todo.id)}>
                                        <Save size={18}/>
                                    </button>
                                    <button className="text-icon-text cursor-pointer"
                                            onClick={handleCancel}>
                                        <X size={18}/>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 flex-1">
                                    <button className="text-check" onClick={handleToggle(todo.id)} >
                                        {todo.completed? (
                                            <CheckSquare size={18}/>
                                        ):(
                                           <Square size={18}/>
                                        )}
                                    </button>
                                    <span className="text-icon-text font-semibold">{todo.text}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-icon-text cursor-pointer"
                                            onClick={handleEdit(todo.id, todo.text)}>
                                        <Edit size={18}/>
                                    </button>
                                    <button className="text-icon-text cursor-pointer" onClick={handleDelete(todo.id)}>
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList