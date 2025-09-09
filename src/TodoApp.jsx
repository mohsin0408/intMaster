import React, { useState } from "react";
import LogoutButton from "./LogoutButton";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  };

  const handleSave = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === edit.id ? { ...todo, text: editText } : todo
      )
    );
    setEdit(null);
    setEditText("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const textA = a.text.toLowerCase();
      const textB = b.text.toLowerCase();
      return sortOrder === "asc"
        ? textA.localeCompare(textB)
        : textB.localeCompare(textA);
    });

  return (
    <div
      className={`min-h-screen p-6 font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}>
      <h2 className="mb-4 text-2xl font-bold">📝 Simple Todo App</h2>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 mb-4 text-white bg-indigo-500 rounded hover:bg-indigo-600">
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
          Add
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={handleSortToggle}
          className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
          Sort {sortOrder === "asc" ? "Z–A" : "A–Z"}
        </button>
      </div>

      <ul>
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500">No matching todos...</p>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo.id} className="mb-3">
              {edit && edit.id === todo.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-white rounded shadow dark:bg-gray-800">
                  <span>{todo.text}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEdit(todo);
                        setEditText(todo.text);
                      }}
                      className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
      <LogoutButton />
    </div>
  );
}

export default TodoApp;
