import { useState, useRef, useEffect } from "react";
import type { Todo } from "../types/todo";
import { Trash, PencilLine } from "lucide-react";

interface TodoProps {
   data: Todo; // single todo
   onCompletedChange: (id: number, completed: boolean) => void;
   onDelete: (id: number) => void;
   onUpdate: (id: number, title: string) => void;
}

export default function TodoItem({
   data,
   onCompletedChange,
   onDelete,
   onUpdate,
}: TodoProps) {
   const { id, title, completed } = data;

   const [onEdit, setOnEdit] = useState(false);
   const [input, setInput] = useState(title);
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (onEdit && inputRef.current) {
         inputRef.current.focus();
      }
   }, [onEdit]);

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!input.trim()) return;

      onUpdate(id, input);
      inputRef.current?.blur();
   }
   return (
      <div className="flex flex-row space-x-2">
         <label className="flex w-full items-center border rounded-md p-2 border-gray-500 bg-white hover:bg-slate-50">
            <span className="flex items-center gap-2 flex-1 min-w-0">
               <input
                  type="checkbox"
                  className="scale-125"
                  checked={completed}
                  onChange={(e) => onCompletedChange(id, e.target.checked)}
               />
               {!onEdit ? (
                  <span
                     className={`block truncate ${
                        completed ? "line-through text-gray-400" : ""
                     }`}
                  >
                     {title}
                  </span>
               ) : (
                  <form onSubmit={handleSubmit} className="flex w-full">
                     <input
                        className="w-full flex-1 min-w-0 px-2 py-1"
                        ref={inputRef}
                        type="text"
                        defaultValue={title}
                        onBlur={() => setOnEdit(false)}
                        onChange={(e) => setInput(e.target.value)}
                     />
                  </form>
               )}
            </span>
            <span className="flex items-center justify-center gap-2 shrink-0 ml-2 h-full">
               <button
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => setOnEdit((prev) => !prev)}
                  disabled={completed}
               >
                  <PencilLine className={completed ? "text-gray-400" : ""} />
               </button>
            </span>
         </label>
         <button onClick={() => onDelete(id)} className="cursor-pointer">
            <Trash />
         </button>
      </div>
   );
}
