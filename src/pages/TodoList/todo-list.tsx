import { useEffect, useRef, useState, KeyboardEvent } from "react";
import classNames from "classnames";
import data from "../../data/todos.json";
import "./todo-list.css";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export function TodoList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskBeingEditedId, setTaskBeingEditedId] = useState<
    TaskType["id"] | null
  >(null);

  const taskTitlesRef = useRef<{ [index: TaskType["id"]]: HTMLInputElement }>(
    {}
  );

  useEffect(() => {
    setTasks(data.todos);
  }, []);

  const handleTaskDeleteClick = (deletedTask: TaskType) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task !== deletedTask)
    );
  };

  const handleTaskUpdateStatusChange =
    (updatedTask: TaskType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isDone = e.target.checked;

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task === updatedTask ? { ...task, isDone } : task
        )
      );
    };

  const handleNewTaskTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    const title = newTaskTitle.trim();

    if (key === "Enter" && title !== "") {
      setTasks((previousTasks) =>
        previousTasks.concat({
          id: previousTasks.length + 1,
          title,
          isDone: false,
        })
      );

      setNewTaskTitle("");
    }
  };

  const handleTaskTitleLabelDoubleClick =
    (task: TaskType) =>
    (_e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
      const input = taskTitlesRef.current[task.id];

      setTaskBeingEditedId(task.id);

      input.value = task.title;

      setTimeout(() => input.focus(), 0);
    };

  const handleTaskTitleKeyDown =
    (editedTask: TaskType) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = taskTitlesRef.current[editedTask.id];
      const { key } = e;
      const title = input.value.trim();

      if (key === "Enter") {
        if (title !== "" && title !== editedTask.title)
          setTasks((previousTasks) =>
            previousTasks.map((task) =>
              task === editedTask ? { ...task, title } : task
            )
          );

        setTaskBeingEditedId(null);
      } else if (key === "Escape") {
        input.value = editedTask.title;
      }
    };

  const activeTasks = tasks.filter((task) => !task.isDone);

  return (
    <section className=" wrapper">
      <h1>todos</h1>
      <section className=" todoapp">
        <header className="header">
          <input
            className="new_todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleNewTaskTitleKeyDown}
          />
        </header>

        <section className=" main">
          <input id="toggle_all" className="toggle_all" type="checkbox" />
          <label htmlFor="toggle-all"></label>
          <ul className="todo_list">
            {tasks.flatMap((task) => (
              <li
                key={task.id}
                // className={`$"completed"`}
                className={classNames({
                  completed: task.isDone,
                  editing: task.id === taskBeingEditedId,
                })}
              >
                <div className=" view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={task.isDone}
                    onChange={handleTaskUpdateStatusChange(task)}
                  />
                  <label onDoubleClick={handleTaskTitleLabelDoubleClick(task)}>
                    {task.title}
                  </label>
                  <button
                    onClick={() => {
                      handleTaskDeleteClick(task);
                    }}
                    className="destroy"
                  ></button>
                </div>
                <input
                  ref={(el) => {
                    if (el !== null) taskTitlesRef.current[task.id] = el;
                  }}
                  onKeyDown={handleTaskTitleKeyDown(task)}
                  className="edit"
                />
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo_count">
            <strong>{activeTasks.length}</strong> item
            {activeTasks.length !== 1 && "s"} left
          </span>
          <ul className="filters">
            <li>
              <a className=" selected" href="#/">
                All
              </a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button className="clear_completed">Clear completed</button>
        </footer>
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        <p>Created by Mouzinho Raimundo</p>
      </footer>
    </section>
  );
}
