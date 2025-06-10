import TodoListLogo from "./TodoListLogo.tsx";

const Header = () => {
    return (
        <>
            <header className="bg-[#B3DCD6] fixed w-full">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <TodoListLogo />
                    <span className="text-[#BD9192] font-bold">To Do List</span>
                </div>
            </header>

        </>
    )
}

export default Header;