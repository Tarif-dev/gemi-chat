"use client"
import React, { useState } from "react";
import { Hamburger, Menu, NotebookPen, Search, Settings , EllipsisVertical, Trash2 , Pin , Archive} from "lucide-react";

function SidePanel() {
  const [activeDropdown, setActiveDropdown] = useState(null)

  const [history,setHistory] = useState([
    "Simple Greeting and Respon...",
    "Vertex Al Prompt Creation G...",
    "Gym Equipment Usage Inqui...",
    "Image Prompt Interface Exp...",
    "Portrait Request: Black and ...",
    "NFA to DFA Conversion Proc...",
    "Ya Russkiy Song Details",
    "Finite Difference Operator P...",
    "Finite Difference Operator F...",
    "Coin Toss Probability: Conse...",
    "Jacobi Method Solution Exp...",
    "No Root Found in Interval",
    "Newton-Raphson Method E...",
    "Simple Greeting and Respon...",
    "Vertex Al Prompt Creation G...",
    "Gym Equipment Usage Inqui...",
    "Image Prompt Interface Exp...",
    "Portrait Request: Black and ...",
    "NFA to DFA Conversion Proc...",
    "Ya Russkiy Song Details",
    "Finite Difference Operator P...",
    "Finite Difference Operator F...",
    "Coin Toss Probability: Conse...",
    "Jacobi Method Solution Exp...",
    "No Root Found in Interval",
    "Newton-Raphson Method E...",
  ]);

  const showDropDown = (index)=>{
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const handleAction = (action,index) => {
    console.log(`${action} clicked for item ${index}`)
    if (action === 'delete') {
      setHistory(prevHistory => prevHistory.filter((_,i) => i !== index))
    }
    setActiveDropdown(null)
  }

  return (
    <div className="bg-gray-800 h-screen w-1/4 lg:flex flex-col gap-4 py-4 px-3 hidden">
      <div className="flex justify-between items-center">
        <div className="hover:bg-gray-600 p-2 rounded-full">
          <Menu />
        </div>
        <div className="hover:bg-gray-600 p-2 rounded-full">
          <Search />
        </div>
      </div>
      <div className="p-2 hover:bg-gray-600 rounded-lg">
        <button className="flex gap-4 items-center">
          <NotebookPen size={16}/>
          <h4>New Tab</h4>
        </button>
      </div>
      <h3 className="text-sm text-gray-400">Recents</h3>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {history.map((title,index) => {
          return (
            <div key={index} className="px-2 py-1 hover:bg-gray-600 hover:cursor-pointer rounded-lg flex items-center justify-between group relative">
              <h3 className="">{title}</h3>
              <EllipsisVertical size={15} className="hidden group-hover:block" onClick={(e)=>{
                e.stopPropagation()
                showDropDown(index)
              }}/>
              {activeDropdown === index && (
                <div className="absolute right-0 top-6 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 min-w-32">
                  <button
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-600 w-full text-left rounded-t-lg"
                  onClick={()=>handleAction('pin',index)}
                  >
                    <Pin size={14}/>
                    Pin
                  </button>
                  <button
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-600 w-full text-left "
                  onClick={()=>handleAction('archive',index)}
                  >
                    <Archive size={14}/>
                   Archive
                  </button>
                  <button
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-600 w-full text-left rounded-b-lg text-red-400"
                  onClick={()=>handleAction('delete',index)}
                  >
                    <Trash2 size={14}/>
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 p-2 items-center">
        <Settings/>
        <h4>Settings</h4>
      </div>
    </div>
  );
}

export default SidePanel;
