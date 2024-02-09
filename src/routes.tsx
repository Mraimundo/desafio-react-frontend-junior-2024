import { createBrowserRouter } from "react-router-dom";

import { TodoList } from "./pages/TodoList/todo-list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
]);
