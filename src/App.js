import "./App.css";
import AddTodoList from "./Components/AddTodoList";
import logo from "./logo.png";
import { BiSearchAlt } from "react-icons/bi";
// import { toast } from 'react-hot-toast';
// import {RiDeleteBack2Fill} from 'react-icons/ri';

function App() {
  
  return (
    <div className="bg-[var(--secondary-color)] text-[var(--text-color)] min-h-screen">

      {/* nav bar */}
      <nav className="flex justify-between items-center w-full px-20 py-5 ">
        <div className="bg-[var(--secondary-light-shade)] flex items-center px-2 rounded-lg">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search here"
            className="h-10 w-[100%] px-2 border-none bg-[var(--secondary-light-shade)] focus:outline-none caret-[var(--primary-light-shade)] text-[var(--text-color)]"
          />
          <BiSearchAlt className="text-2xl text-[var(--primary-light-shade)] cursor-pointer" />
        </div>
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-[40px] h-[40px]" />
          <h1 className="text-2xl pl-2">Todo List</h1>
        </div>
        <div className="bg-[var(--secondary-light-shade)] flex items-center px-4 rounded-lg py-2">
          <label htmlFor="filter">
            Filter By:-
            <select
              name="cars"
              id="cars"
              className="bg-[var(--secondary-light-shade)] focus:outline-none pl-2"
            >
              <option>Select</option>
              <option value="a-z">(A - Z)</option>
              <option value="z-a">(Z - A)</option>
            </select>
          </label>
        </div>
      </nav>

    <AddTodoList/>



    </div>
  );
}

export default App;
