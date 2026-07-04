import { useState } from "react";
import { useEffect } from "react";
import Header from "./Todoheader";
import moment from "moment";
const TodoInput = () => {
  const [text, setText] = useState("");
  const storedTodo = JSON.parse(localStorage.getItem("todoList")) || [];
  const [todoList, setList] = useState([...storedTodo]);
  const [isEdit, setIsEdit] = useState(false);
  const [Editindex, setEditIndex] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList)) || [];
  }, [todoList]);

  //handel task
  const addTask = () => {
    if (text.trim() !== "") {
      console.log("lol");
      //updating the todoList
      setList([
        ...todoList,
        { text: text, completed: false, date: moment().format("Do MMM YYYY") },
      ]);
      setText("");
    }
  };

  const editTask = (index) => {
    setText(todoList[index].text);
    setEditIndex(index);
    setIsEdit(true);
  };

  const saveEdit = (index) => {
    if (text.trim() === "") return;
    const updatedList = [...todoList]; //copy todo array
    console.log(updatedList);

    updatedList[Editindex].text = text; // Replace the old text
    setList(updatedList);
    setText("");
    setEditIndex(null);
    setIsEdit(false);
  };
  // saveEdit()
  const cancelEdit = () => {
    setIsEdit(false);
  };

  const deleteTask = (index) => {
    const Delete = todoList.filter((item, i) => i !== index);
    localStorage.removeItem("todoList");
    setList(Delete); //updating delete state
  };

  const handleCompletedTodo = (index) => {
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;
    alert("TodoCompleted");
    setList(updatedList);
  };

  return (
    <>
      <div className="Todo_con">
        <Header header="Todo Application" />
        <div className="todo_input_row">
          <input
            className="todo_input"
            type="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              isEdit ? "Edit your todo..." : "What do you want to do today?"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                isEdit ? saveEdit() : addTask();
              }
            }}
          />

          <div className="buttonOne">
            <button onClick={isEdit ? saveEdit : addTask}>
              {isEdit ? "Save" : "Add"}
            </button>
          </div>
        </div>

        <div>
          <div className="output">
            {todoList.map((todo, index) => {
              // rendering the todoListt
              console.log(todoList);
              return (
                <div className="d" key={index}>
                  <div className="todo_output_con">
                    <div className="todo_content">
                      <div
                        className={`todo_output ${todo.completed ? "todo_completed" : ""}`}
                      >
                        {todo.text}
                      </div>

                      <div className="date">{todo.date}</div>
                    </div>
                    <div className="s">
                      <div
                        className={`buttonOne ${todo.completed ? "jjj" : "none"}`}
                      >
                        <button onClick={() => editTask(index)}>Edit</button>
                      </div>
                      <div
                        className={`buttonOne ${todo.completed ? "jjj" : "none"}`}
                      >
                        <button onClick={() => deleteTask(index)}>
                          Delete
                        </button>
                      </div>
                      <div className={`buttonOne`}>
                        <button onClick={() => handleCompletedTodo(index)}>
                          completed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoInput;
