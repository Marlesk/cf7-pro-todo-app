import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import {useReducer} from "react";
//import {useState} from "react";
import type { TodoProps, Action } from "../types.ts"

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
            default:
                return state
        }
    }

const Todo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [])
    //const [todos, setTodos] = useState([])
    console.log(todos)

    return (
        <>
            <div className="max-w-md mx-auto p-6 mb-4">
                <h1 className="text-center text-2xl text-icon-text mt-2">
                    To-Do List
                </h1>
                <TodoForm dispatch = {dispatch}/>
                <TodoList todos = {todos} dispatch = {dispatch}/>
            </div>
        </>
    )
}

export default Todo;