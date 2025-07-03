"use client"
import Todo from "@/Components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

export default function Home() {
  const [formData,setFormData] = useState({
    title :"",
    description :""
  })
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form=> ({...form,[name]:value}) )
    console.log(formData)
  }
  const onSubmitHandle = async (e) => {
    e.preventDefault()

    try{
        
      toast.success("Todo Added Successfully")
    }
    catch(error){
      console.log(error)
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
           <Todo/>
           <Todo/>
           <Todo/>
           <Todo/>
          
          </tbody>
        </table>
      </div>
    </>
  );
}
