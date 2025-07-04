import React, { useState } from "react"; 

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  // Add new todo
  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  };

  // Save edited todo
  const handleSave = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === edit.id ? { ...todo, text: editText } : todo
      )
    );
    setEdit(null);
    setEditText("");
  };

  // Delete todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sort todos
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter + sort todos
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
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#f2f2f2",
        color: isDarkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}>
      <h2>📝 Simple Todo App</h2>

      {/* THEME TOGGLE */}
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      {/* SEARCH BAR */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Search todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ADD NEW TODO */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Add new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* SORT BUTTON */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSortToggle}>
          Sort {sortOrder === "asc" ? "Z–A" : "A–Z"}
        </button>
      </div>

      {/* TODO LIST */}
      <ul style={{ marginTop: "20px" }}>
        {filteredTodos.length === 0 ? (
          <p>No matching todos...</p>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "8px" }}>
              {edit && edit.id === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={handleSave}>Save</button>
                </>
              ) : (
                <>
                  {todo.text}
                  <button
                    onClick={() => {
                      setEdit(todo);
                      setEditText(todo.text);
                    }}
                    style={{ marginLeft: "10px" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
