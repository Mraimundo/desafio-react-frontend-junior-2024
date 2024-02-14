import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import data from "../data/todos.json";

import { FilterType, TaskType, TodoList } from "../pages/TodoList/todo-list";

export function AppRoutes() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const navigate = useNavigate();

  useEffect(() => {
    setTasks(data.todos);
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    navigate(filter === "all" ? "/" : `/${filter}`);
  };

  if (window.location.pathname === "/") {
    return <Navigate to="/all" />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoList
            filter="all"
            tasks={tasks}
            setTasks={setTasks}
            onFilterChange={handleFilterChange}
          />
        }
      />
      <Route
        path="/all"
        element={
          <TodoList
            filter={activeFilter}
            tasks={tasks}
            setTasks={setTasks}
            onFilterChange={handleFilterChange}
          />
        }
      />
      <Route
        path="/active"
        element={
          <TodoList
            filter="active"
            tasks={tasks}
            setTasks={setTasks}
            onFilterChange={handleFilterChange}
          />
        }
      />
      <Route
        path="/completed"
        element={
          <TodoList
            filter="completed"
            tasks={tasks}
            setTasks={setTasks}
            onFilterChange={handleFilterChange}
          />
        }
      />
    </Routes>
  );
}
