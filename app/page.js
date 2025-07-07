"use client"
import Todo from "@/Components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData,setFormData] = useState({
    title :"",
    description :""
  })

  const [todos,setTodos] = useState([])

  const fetchTodos =  async () => {
    const res = await axios.get('/api')
    setTodos(res.data.todos)
  
  }


  const deleteTodo = async (mongoId) => {
         const res  = await axios.delete('/api',{
          params: {
            mongoId : mongoId
          }
         })
         toast.success(res.data.message)
         fetchTodos();
  }
  useEffect(()=>{
    fetchTodos()
  },[])

  const completeTodo = async (id) =>{
     const res = await axios.put('/api',{},{
      params: {
        mongoId : id
      }
     })
     toast.success(res.data.message)
     fetchTodos()
  }

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form=> ({...form,[name]:value}) )
    console.log(formData)
  }
  const onSubmitHandle = async (e) => {
    e.preventDefault()

    try{
      const res =  await axios.post('/api',formData)
      toast.success(res.data.message)
      setFormData({
        title : "",
        description : ""
      })
    }
    catch(error){
      toast.error(error)
    }

  }
  return (
    <>
      <ToastContainer theme="dark"/>
      <form onSubmit={onSubmitHandle} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input
          type="text"
          className="px-3 py-2 border-2 border-black w-full"
          placeholder="Enter Title"
          name="title"
          onChange={onChangeHandler}
          value={formData.title}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHandler}
          value={formData.description}
        ></textarea>
        <button
          className="bg-orange-600 py-3 px-11 text-white rounded-lg cursor-pointer"
          type="submit"
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[600px] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo,index)=>{
              return <Todo id={index} key={todo._id} title={todo.title} description = {todo.description} complete={todo.isCompleted} mongoId = {todo._id} deleteTodo = {deleteTodo} completeTodo = {completeTodo}/>
            })}
               
          
          </tbody>
        </table>
      </div>
    </>
  );
}
