import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import data from "../data/todos.json";

import { TaskType, TodoList } from "../pages/TodoList/todo-list";

export function AppRoutes() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    setTasks(data.todos);
  }, []);

  return (
    <Routes>
      <Route
        path="/all"
        element={<TodoList filter="all" tasks={tasks} setTasks={setTasks} />}
      />
      <Route
        path="/active"
        element={<TodoList filter="active" tasks={tasks} setTasks={setTasks} />}
      />
      <Route
        path="/completed"
        element={
          <TodoList filter="completed" tasks={tasks} setTasks={setTasks} />
        }
      />
    </Routes>
  );
}
