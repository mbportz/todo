import { useState, useRef, useEffect } from "react";
import { dummyData } from "../data/todo";
import type { Todo } from "../types/todo";

export function useTodos() {
   const [todos, setTodos] = useState(() => {
      const saveTodos: Todo[] = JSON.parse(
         localStorage.getItem("todos") || "[]"
      );
      return saveTodos.length > 0 ? saveTodos : dummyData;
   });

   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
   }, [todos]);

   const nextId = useRef(
      todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1
   );

   function setTodoCompleted(id: number, completed: boolean) {
      setTodos((prev) =>
         prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
   }

   function addTodo(title: string) {
      setTodos((prevTodos) => [
         {
            id: nextId.current++,
            title,
            completed: false,
         },
         ...prevTodos,
      ]);
   }

   function removeTodo(id: number) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
   }

   function updateTodo(id: number, title: string) {
      setTodos((prev) =>
         prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
      );
   }

   function deleteCompletedTodos() {
      setTodos((prev) => prev.filter((todo) => !todo.completed));
   }

   return {
      todos,
      setTodoCompleted,
      addTodo,
      removeTodo,
      updateTodo,
      deleteCompletedTodos,
   };
}
