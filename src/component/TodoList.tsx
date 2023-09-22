import { useState } from "react";
import Todo from "../model/Todo";
import { ImCheckmark } from "react-icons/im";
function TodoList() {
  const [todos, setTodo] = useState<Todo[]>([
    {
      id: 1,
      content: "task 1",
      finished: false,
    },
    {
      id: 2,
      content: "task 2",
      finished: false,
    },
  ]);
  const [error, setError] = useState("");
  const [todoIput, setTodoInput] = useState("");

  const handleAdd = () => {
    if (todoIput === "") {
      return setError("Required Some Action ToDo");
    } else {
      setError("");
    }
    const newTodo: Todo = {
      id: todos.length + 1,
      content: todoIput.trim(),
      finished: false,
    };
    setTodo([...todos, newTodo]);
    setTodoInput("");
  };

  const handleDelete = (id: number) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  const handleFinish = (id: number, finished: boolean) => {
    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, finished: !finished } : todo,
      ),
    );
  };

  return (
    <div className={" w-50 mx-auto"}>
      <h1 className="text-secondary text-center">TODOLIST</h1>
      {error && <p className="text-danger">{error}</p>}
      <div className={"d-flex mb-2"}>
        <input
          type="text"
          className="form-control fs-5 me-3"
          onChange={(event) => {
            setTodoInput(event.currentTarget.value);
          }}
          placeholder="Enter To Do.."
          value={todoIput}
        />
        <button className="btn btn-success fw-semibold" onClick={handleAdd}>
          ADD
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            className={[
              "fs-4 list-group-item text-bg-secondary d-flex align-items-center justify-content-between mb-2 rounded",
              todo.finished ? "text-bg-success" : "",
            ].join(" ")}
            key={todo.id}
          >
            {todo.content}
            <div>
              <button
                className="btn btn-danger fw-semibold me-3"
                onClick={() => handleDelete(todo.id)}
              >
                DELETE
              </button>
              <button
                className="btn"
                onClick={() => handleFinish(todo.id, todo.finished)}
              >
                <ImCheckmark size={15} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
