import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import {useEffect, useReducer} from "react";
//import {useState} from "react";
import type { TodoProps, Action } from "../types.ts"

const getInitialTodos = () => {
    const stored =  localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : []
}
const todoReducer =
    (state: TodoProps[], action: Action): TodoProps[] => {
        switch (action.type) {
            case "ADD": {
                const newTodo: TodoProps = {
                    id: Date.now(),
                    text: action.payload,
                    completed: false
                }
                return [...state, newTodo]
            }
            case "DELETE":
                return state.filter(todo => todo.id !== action.payload)
            case "EDIT":
                return state.map(todo => todo.id === action.payload.id
                                                    ? {...todo, text: action.payload.newText} : todo
                )
            case "COMPLETE":
                return state.map(todo => todo.id === action.payload
                                                    ? {...todo, completed:!todo.completed}
                                                    : todo
                )
            case "CLEAR_ALL":
                return []
            default:
                return state
        }
    }

const Todo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos)
    //const [todos, setTodos] = useState([])
    console.log(todos)
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos]);

    const handleClearAll = () => {
        dispatch({type: "CLEAR_ALL"})
    }

    const totalTasks: number = todos.length;
    const completedTasks: number = todos.filter(t => t.completed).length;
    const activeTasks: number = totalTasks - completedTasks;

    return (
        <>
            <div className="max-w-md mx-auto p-6 mb-4">
                <h1 className="text-center text-2xl text-icon-text mt-2">
                    To-Do List
                </h1>
                <TodoForm dispatch = {dispatch}/>
                <TodoList todos = {todos} dispatch = {dispatch}/>
                {todos.length > 0 && (
                    <>
                        <div className="flex justify-between border-t pt-2 mt-4 text-icon-text">
                            <span>Total: {totalTasks}</span>
                            <span>Active: {activeTasks}</span>
                            <span>Completed: {completedTasks}</span>
                        </div>
                        <div className="text-end mt-4">
                            <button className="bg-list-icon text-white py-2 px-4 rounded cursor-pointer" onClick={handleClearAll}>
                                Clear All
                            </button>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Todo;