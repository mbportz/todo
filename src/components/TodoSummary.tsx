import type { Todo } from "../types/todo";

interface TodoSummaryProps {
   todos: Todo[];
   deleteAllCompleted: () => void;
}

export default function TodoSummary({
   todos,
   deleteAllCompleted,
}: TodoSummaryProps) {
   const completedTodos = todos.filter((todo) => todo.completed);

   return (
      <div className="text-center space-y-2 mt-5">
         <p className="text-sm font-medium">
            {completedTodos.length}/{todos.length} todos completed
         </p>
         {completedTodos.length > 0 && (
            <button
               className="text-red-400 text-sm font-medium hover:underline cursor-pointer"
               onClick={deleteAllCompleted}
            >
               Delete completed todos
            </button>
         )}
      </div>
   );
}
