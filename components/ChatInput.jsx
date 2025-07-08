import { ArrowUp, Notebook, Plus, PlusCircle, Search } from "lucide-react";
import React from "react";

function ChatInput() {
  return (
    <div className="border border-gray-400 rounded-xl overflow-hidden flex flex-col m-4 p-4">
      <textarea
        className="textarea textarea-ghost w-full text-xl focus:outline-none no-scrollbar"
        placeholder="How may I help you ?"
      ></textarea>
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <button
            title="Add files"
            className="btn btn-ghost rounded-xl hover:bg-transparent"
          >
            <PlusCircle />
          </button>



          {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
          {/* For TSX uncomment the commented types below */}
          <button
            className="btn lg:hidden "
            popoverTarget="popover-1"
            style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
          >
            Button
          </button>
          <ul
            className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm dropdown-top"
            popover="auto"
            id="popover-1"
            style={
              { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
            }
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>


          <button
            title="Get in depth answers"
            className="btn btn-ghost rounded-xl hover:bg-gray-600 hidden lg:flex"
          >
            <Search size={20} />
            Deep Search
          </button>
          <button className="btn btn-ghost rounded-xl hover:bg-gray-600 hidden lg:flex">
            <Notebook size={20} />
            Canvas
          </button>
        </span>
        <button className="btn btn-ghost rounded-full hover:bg-gray-600 ">
          <ArrowUp />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
