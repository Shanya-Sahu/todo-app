import React, { useRef, useState } from "react";
import { RxLockOpen1 } from "react-icons/rx";
import { MdRunningWithErrors } from "react-icons/md";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { MdPendingActions } from "react-icons/md";
import { toast } from "react-hot-toast";
import logo from "../logo.png";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


function AddTodoList() {

  //delete todo item
  const onDelete = (e) => {
    console.log("Delete Todo Item!");
    toast("Delete Todo Item!", {
      icon: <MdDelete />,
      style: {
        background: "red",
        color: "#fff",
      },
    });

    const parentElement = e.target.closest('.parent');
    console.log(parentElement);

    // Remove the parent element from the DOM
    parentElement.parentNode.removeChild(parentElement);
  };

  //Edit todo item
  const onEdit = (e) => {
    console.log("Edit Todo Item!");
    toast("Updating Todo Item!", {
      icon: <FaRegEdit />,
      style: {
        background: "var(--primary-color)",
        color: "#fff",
      },
    });

    const parentElement = e.target.closest('.parent');
    console.log(parentElement);

    let editTitle = parentElement.children[1].innerText;
    let editTaskDesc = parentElement.children[2].innerText;
    let editTag = parentElement.children[3].innerText;
    let editDueDate = parentElement.children[4].innerText;
    let editStatus = parentElement.children[5].innerText;
    



    console.log("edit todo item",editTitle , editTaskDesc , editTag, editDueDate , editStatus);
  };

  //disable previous date
  const [selectedDate, setSelectedDate] = useState("");

  // get today's date
  const today = new Date();

  //every time add new task with previous task
  const [addTask, setAddTask] = useState([]);

  //store values to localstorage
  const titleValue = useRef();
  const taskDescValue = useRef();
  const dueDateValue = useRef();
  const tagValue = useRef();
  const statusValue = useRef();

  //Handle multiple state
  const [inputData, setInputData] = useState({
    title: "",
    taskDesc: "",
    dueDate: "",
    tag: "",
    status: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target; //destructing
    setInputData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    console.log("Final Input Data is: ", inputData);

    // save data into localStorage
    localStorage.setItem("title", titleValue.current.value);
    localStorage.setItem("taskDesc", taskDescValue.current.value);
    localStorage.setItem("dueDate", dueDateValue.current.value);
    localStorage.setItem("tag", tagValue.current.value);
    localStorage.setItem("status", statusValue.current.value);

    let addNewTask = (
      <tr className="parent data-todoList w-[100%] text-center cursor-pointer transition-all duration-500 hover:bg-[var(--primary-color)]">
        <td className="w-[10%] border-2 py-2">{date}</td>
        <td className="w-[20%] border-2 py-2">
          {localStorage.getItem("title")}
        </td>
        <td className="w-[30%] border-2 py-2">
          {localStorage.getItem("taskDesc")}
        </td>
        <td className="w-[10%] border-2 py-2">
          {localStorage.getItem("dueDate")}
        </td>
        <td className="w-[10%] border-2 py-2">{localStorage.getItem("tag")}</td>
        <td className="w-[10%] border-2 py-2">
          {localStorage.getItem("status")}
        </td>
        <td className="w-[20%] border-2 py-2 ">
          {
            <div className="mx-auto w-full flex justify-center items-center">
              <MdDelete
                className="mr-4 text-[var(--text-color)] hover:text-red-600 cursor-pointer transition-all hover:text-2xl"
                onClick={onDelete}
              />{" "}
              <FaRegEdit
                className=" text-[var(--text-color)] cursor-pointer transition-all hover:text-2xl"
                onClick={onEdit}
              />
            </div>
          }
        </td>
      </tr>
    );
    setAddTask((preArray) => [...preArray, addNewTask]);

    for (let data in inputData) {
      inputData[data] = ""; //blank inputData values
    }

    //blank input feilds
    let title = document.querySelector("#title");
    title.value = "";

    let taskDesc = document.querySelector("#task-desc");
    taskDesc.value = "";

    let dueDate = document.querySelector("#due-date");
    dueDate.value = "";

    let tag = document.querySelector("#tag");
    tag.value = "";

    setSelectedDate('');
    toast.success("Task added successfully!");
  }

  console.log(inputData);

  // todo list
  const date = new Date().toLocaleDateString(); //TimeStamp ---> for current date
  console.log(date);

  console.log("props value", inputData);
  console.log("props", inputData);

  //when we click on todo tasklist
  let dataTodoList = document.querySelector(".data-todoList");
  console.log(dataTodoList);

  return (
    <div className="min-h-screen pt-10">
      <form
        onSubmit={formSubmitHandler}
        className="flex justify-evenly items-center flex-col w-[50%] min-h-[80vh] mx-auto bg-[var(--secondary-light-shade)] rounded-lg"
      >
        <input
          type="text"
          ref={titleValue}
          name="title"
          id="title"
          placeholder="Task title*"
          onChange={changeHandler}
          value={inputData.title}
          className="bg-[var(--secondary-color)] h-[50px] w-[80%] rounded-lg px-4 focus:outline-none"
          required
        />
        <textarea
          name="taskDesc"
          ref={taskDescValue}
          id="task-desc"
          placeholder="Task description*"
          onChange={changeHandler}
          value={inputData.taskDesc}
          cols="10"
          rows="5"
          className="bg-[var(--secondary-color)] w-[80%] rounded-lg focus:outline-none p-4"
          required
        ></textarea>
        {/* disable past dates */}
        <input
          type="date"
          ref={dueDateValue}
          id="due-date"
          value={selectedDate}
          className="bg-[var(--secondary-color)] h-[50px] w-[80%] rounded-lg focus:outline-none px-4"
          onChange={(e) => setSelectedDate(e.target.value)}
          min={today.toISOString().split("T")[0]} // set min attribute to today's date
        />

        <input
          type="text"
          ref={tagValue}
          name="tag"
          id="tag"
          placeholder="Task tag"
          onChange={changeHandler}
          value={inputData.tag}
          className="bg-[var(--secondary-color)] h-[50px] w-[80%] rounded-lg focus:outline-none px-4"
        />

        <div className="bg-[var(--secondary-color)] w-[80%] flex justify-between items-center h-[50px] py-4 rounded-lg">
          <input
            readOnly
            type="text"
            placeholder="Task status"
            className="bg-[var(--secondary-color)] h-[50px] w-[20%] pl-4 focus:outline-none rounded-lg"
          />
          <div className="flex items-center justify-between px-4 rounded-lg w-[90%]">
            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                ref={statusValue}
                onChange={changeHandler}
                value="working"
                checked={inputData.status === "working"}
              />
              <label htmlFor="working" className="flex items-center px-2">
                Working <MdRunningWithErrors className="ml-1" />
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                ref={statusValue}
                onChange={changeHandler}
                value="done"
                checked={inputData.status === "done"}
              />
              <label htmlFor="done" className="flex items-center px-2">
                Done <AiOutlineCheckSquare className="ml-1" />
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                ref={statusValue}
                onChange={changeHandler}
                value="overdue"
                checked={inputData.status === "overdue"}
              />
              <label htmlFor="overdue" className="flex items-center px-2">
                Overdue <MdPendingActions className="ml-1" />
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                ref={statusValue}
                onChange={changeHandler}
                value="open"
                checked={inputData.status === "open"}
              />
              <label htmlFor="open" className="flex items-center px-2">
                Open <RxLockOpen1 className="ml-1" />
              </label>
            </div>
          </div>
        </div>

        <button className="bg-[var(--secondary-color)] h-[50px] w-[80%] rounded-lg focus:border-none px-4 transition-all duration-1000 hover:bg-[var(--primary-color)] active:border-none border-none ">
          Submit
        </button>
      </form>

      {/* ALL TODO LIST */}
      <div className="flex justify-evenly items-start flex-wrap min-h-screen w-full pt-20">
        <div className="flex justify-center items-center flex-col w-[90%] min-h-[100px] bg-[var(--secondary-light-shade)] rounded-lg py-10">
          <div className="flex justify-center items-center pb-4">
            <img src={logo} alt="logo" className="w-[40px] h-[40px]" />
            <h1 className="text-2xl pl-2">Todo List</h1>
          </div>

          <table className="w-[90%]">
            <thead className="border-2 text-[var(--primary-light-shade)]">
              <tr>
                <th className="w-[10%] border-2 py-2">Timestamp</th>
                <th className="w-[20%] border-2 py-2">Title</th>
                <th className="w-[30%] border-2 py-2">Description</th>
                <th className="w-[10%] border-2 py-2">Duedate</th>
                <th className="w-[10%] border-2 py-2">Tag</th>
                <th className="w-[10%] border-2 py-2">Status</th>
                <th className="w-[20%] py-2">Modify</th>
              </tr>
            </thead>

            {/* add todo item */}
            {addTask.map((element, index) => (
              <tbody key={index}> 
              {element}
              </tbody>
             ))}

          </table>

          
        </div>
      </div>
    </div>
  );
}

export default AddTodoList;
