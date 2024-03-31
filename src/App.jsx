import { useEffect,  useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    let todoString =localStorage.getItem("todos");
    if(todoString){
let todos = JSON.parse(localStorage.getItem("todos"));
setTodos(todos);}
  },[])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleCheckbox= (e) => {
  let id=  e.target.name;
  let index= todos.findIndex(item=>{
    return item.id===id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos);
saveToLS();

  }
  

const handleEdit = (e,id) => {
let t= todos.filter(i=>i.id===id)
setTodo(t[0].todo);
saveToLS();
}
const handleDelete = (e,id) => {
 
  let newTodos = todos.filter(item=>{
return item.id !== id;
  });
  setTodos(newTodos);
saveToLS();

}
const handleAdd = () => {
setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
setTodo("")
console.log(todos);
}
const handleChange = (e) => {
  setTodo(e.target.value)
saveToLS();

  }



  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-xl bg-violet-200 p-5 min-h-[80vh] md:w-1/2">
        <div className="addTodo my-1 flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add a Task</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-4 py-1" />
          <button onClick={handleAdd} className="bg-violet-700 p-3 py-1 text-white hover:bg-violet-950 rounded-md ">Add</button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
         {todos.map(item=>{
        return  <div key={item.id} className="todo flex md:w-1/3 my-3 justify-between">
          <div className="flex gap-3">
          <input onClick={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-700 p-3 py-1 text-white hover:bg-violet-950 rounded-md mx-1"><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-700 p-3 py-1 text-white hover:bg-violet-950 rounded-md mx-1"><MdDeleteSweep /></button>

              </div>
              </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
