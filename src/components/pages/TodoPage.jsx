import  { useState, useEffect } from 'react';
import TodoList from "../TodoList"; // Убедитесь, что этот путь правильный

function TodoPage() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };


    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo) return;

        const newTodoItem = {
            id: Date.now(),
            title: newTodo,
            completed: false
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    const filteredTodos = () => {
        if (filter === 'completed') {
            return todos.filter(todo => todo.completed);
        } else if (filter === 'incomplete') {
            return todos.filter(todo => !todo.completed);
        }
        return todos;
    };

    return (
            <div>
                <h1>My To-Do List</h1>
              
                <form onSubmit={addTodo}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add new task..."
                    />
                    <button type="submit">Add</button>
    
                </form>
                
                <div className="filter-buttons">
            
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter('completed')}>Completed</button>
                    <button onClick={() => setFilter('incomplete')}>Incompleted</button>
    
                </div>
                <a href="/dnd" className="button_godnd">Go to DND</a>
                <TodoList todos={filteredTodos()} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </div>
            
    );
}

export default TodoPage;