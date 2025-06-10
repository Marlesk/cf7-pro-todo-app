import {useState, useRef, useEffect} from "react";
import * as React from "react";
import type { TodoFormProps } from "../types.ts"

const TodoForm = ({dispatch}: TodoFormProps) => {
    const [text, setText] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim() !== "") {
            dispatch({type: "ADD", payload: text})
            setText("")

            inputRef.current?.focus();
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    return (
        <>
            <form className="flex gap-4 mb-4 mt-4" onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" className="text-icon-text font-semibold border border-icon-text p-2 rounded flex-1 focus:outline-list-icon"
                       value={text} placeholder="New task...."
                       onChange={handleChange}/>
                <button type="submit" className="bg-list-icon text-white px-4 py-2 rounded cursor-pointer">
                    Add
                </button>
            </form>
        </>
    )
}

export default TodoForm