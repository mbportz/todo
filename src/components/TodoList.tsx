import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
   todos: Todo[];
   setTodoCompleted: (id: number, completed: boolean) => void;
   removeTodo: (id: number) => void;
   updateTodo: (id: number, title: string) => void;
}

export default function TodoList({
   todos,
   setTodoCompleted,
   removeTodo,
   updateTodo,
}: TodoListProps) {
   const todosSorted = todos.sort((a, b) => {
      if (a.completed === b.completed) {
         return b.id - a.id;
      }
      return a.completed ? 1 : -1;
   });

   return (
      <div className="space-y-2">
         {todosSorted.map((todo) => (
            <TodoItem
               key={todo.id}
               data={todo}
               onCompletedChange={setTodoCompleted}
               onDelete={removeTodo}
               onUpdate={updateTodo}
            />
         ))}
         {todos.length === 0 && (
            <p className="text-center text-sm text-gray-500">
               No todos yet. Add a new one above
            </p>
         )}
      </div>
   );
}
