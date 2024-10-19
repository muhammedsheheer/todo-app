import React, { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [currentTodo, setCurrentTodo] = useState(null);
	const [editText, setEditText] = useState("");
	const inputRef = useRef(null);

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleChange = (e) => {
		setTodo(e.target.value);
	};

	const handleTodos = () => {
		console.log("todo");
		if (todo.trim() !== "") {
			setTodos([...todos, todo]);
			setTodo("");
			inputRef.current.focus();
		}
	};

	const handleRemoveTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	const handleEditTodo = (index) => {
		setIsEditing(true);
		setCurrentTodo(index);
		setEditText(todos[index]);
	};

	const handleSaveEdit = () => {
		const updatedTodos = [...todos];
		updatedTodos[currentTodo] = editText;
		setTodos(updatedTodos);
		setIsEditing(false);
		setCurrentTodo(null);
		setEditText("");
	};

	const handleEditChange = (e) => {
		setEditText(e.target.value);
	};

	return (
		<div className="app">
			<div className="mainHeading">
				<h1>ToDo List</h1>
			</div>
			<div className="subHeading">
				<br />
				<h2>Automate your routine activities.</h2>
			</div>
			<div className="input">
				<input
					ref={inputRef}
					value={todo}
					onChange={handleChange}
					type="text"
					placeholder="Add item..."
				/>
				<i onClick={handleTodos} className="fa-solid fa-square-plus"></i>
			</div>
			<div className="todos">
				{todos.map((value, index) => (
					<div className="todo">
						{isEditing && currentTodo === index ? (
							<div className="left">
								<input
									type="text"
									value={editText}
									onChange={handleEditChange}
								/>
								<button onClick={handleSaveEdit}>Save</button>
							</div>
						) : (
							<div className="left">
								<input type="checkbox" name="" id="" />
								<p>{value}</p>
							</div>
						)}
						<div className="right">
							<i
								onClick={() => handleRemoveTodo(index)}
								className="fa-solid fa-trash"
							></i>
							<i
								onClick={() => handleEditTodo(index)}
								className="fa-solid fa-edit"
							></i>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
