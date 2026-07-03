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
  console.log(localStorage);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList)) || [];
    console.log(storedTodo);
  }, [todoList]);

  //handel task
  const addTask = () => {
    if (text.trim() !== "") {
      console.log("lol");
      //updating the todoList
      setList([...todoList, text]);
      setText("");
    }
  };

  const editTask = (index) => {
    setText(todoList[index]);
    setEditIndex(index);
    setIsEdit(true);
  };

  const saveEdit = (index) => {
    if (text.trim() === "") return;
    const updatedList = [...todoList]; //copy todo array
    updatedList[Editindex] = text; // Replace the old text
    setList(updatedList);
    setText("");
    setEditIndex(null);
    setIsEdit(false);
  };
  const cancelEdit = () => {
    setIsEdit(false);
  };

  const deleteTask = (index) => {
    const Delete = todoList.filter((item, i) => i !== index);
    setList(Delete); //updating delete state
  };

  const handleCompletedTodo = (index) => {
    
  };

  return (
    <>
      <div className="Todo_con">
        <Header header="Todo Application" />
        <div>
          <input
            required
            style={{ width: "200px" }}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="enter entry"
          />
        </div>
        <div className="buttonOne">
          <button onClick={isEdit ? saveEdit : addTask}>
            {isEdit ? "Save" : "Add"}
          </button>
        </div>

        <div>
          <div className="output">
            {todoList.map((todo, index) => {
              // rendering the todoListt

              return (
                <div className="d" key={index}>
                  <div className="todo_output_con">
                    <div className="todo_output">
                      {todo}{" "}
                      <div className="date" style={{ color: "#9a9fa6" }}>
                        {moment().format("Do MMM YYYY")}
                      </div>
                    </div>
                    <div className="s">
                      <div className="buttonOne">
                        <button onClick={() => editTask(index)}>Edit</button>
                      </div>
                      <div className="buttonOne">
                        <button onClick={() => deleteTask(index)}>
                          Delete
                        </button>
                      </div>
                      <div className="buttonOne">
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
