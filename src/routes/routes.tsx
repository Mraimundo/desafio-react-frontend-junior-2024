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

  const handleFilterChange = (filter: FilterType): void => {
    setActiveFilter(filter);
    navigate(filter === "all" ? "/" : `/${filter}`);
  };

  const filterMapping: Record<string, FilterType> = {
    "/": "all",
    "/all": "all",
    "/active": "active",
    "/completed": "completed",
  };

  const renderTodoList = (filter: FilterType): JSX.Element => (
    <TodoList
      filter={filter}
      tasks={tasks}
      setTasks={setTasks}
      onFilterChange={handleFilterChange}
    />
  );

  if (window.location.pathname === "/") {
    return <Navigate to="/all" />;
  }

  return (
    <Routes>
      {Object.entries(filterMapping).map(([path, filter]) => (
        <Route key={path} path={path} element={renderTodoList(filter)} />
      ))}
    </Routes>
  );
}
