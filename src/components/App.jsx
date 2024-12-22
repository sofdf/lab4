import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/DndPage';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/dnd" element={<DndPage />} />
        </Routes>
      </Router> 
    );
}

export default App;

// import React, { useState } from "react";
// import TodoList from "./TodoList";

// function App() {
//     const [todos, setTodos] = useState([
//         { id: 1, title: 'Buy groceries', completed: false },
//         { id: 2, title: 'Read a book', completed: false },
//     ]);
//     const [newTodo, setNewTodo] = useState('');

//     const toggleTodo = (id) => {
//         setTodos(
//             todos.map((todo) =>
//                 todo.id === id ? { ...todo, completed: !todo.completed } : todo
//             )
//         );
//     };

//     const deleteTodo = (id) => {
//         setTodos(todos.filter(todo => todo.id !== id));
//     };

//     const addTodo = (e) => {
//         e.preventDefault();
//         if (!newTodo) return;

//         const newTodoItem = {
//             id: Date.now(),
//             title: newTodo,
//             completed: false
//         };
//         setTodos([...todos, newTodoItem]);
//         setNewTodo('');
//     };

//     const sortTodos = () => {
//         const sortedTodos = [...todos].sort((a, b) => {
//             return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
//         });
//         setTodos(sortedTodos);
//     };

//     return (
//         <div className="main">
//             <h1>My To-Do List</h1>
//             <form className="searchad" onSubmit={addTodo}>
//                 <input
//                     type="text"
//                     value={newTodo}
//                     className="input"
//                     onChange={(e) => setNewTodo(e.target.value)}
//                     placeholder="Add new task..."
//                 />
//                 <button className="button_add" type="submit">Add</button>
//             </form>
//             <button className="button_sort" onClick={sortTodos}>Sort Tasks</button>
//             <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
//         </div>
//     );
// }

// export default App;
