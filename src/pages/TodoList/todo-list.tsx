import { useRef, useState, KeyboardEvent } from "react";
import classNames from "classnames";
import { TodoListFooter } from "../../components/TodoListFooter/todo-list-footer";
import { Footer } from "../../components/Footer/footer";
import "./todo-list.css";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type FilterType = "all" | "active" | "completed";

export type RouteParams = {
  filter?: FilterType;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  onFilterChange: (filter: FilterType) => void;
};

export function TodoList({
  filter,
  tasks,
  onFilterChange,
  setTasks,
}: RouteParams) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskBeingEditedId, setTaskBeingEditedId] = useState<
    TaskType["id"] | null
  >(null);

  const taskTitlesRef = useRef<{ [index: TaskType["id"]]: HTMLInputElement }>(
    {}
  );

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
      setTasks((previousTasks) => [
        {
          id: previousTasks.length + 1,
          title,
          isDone: false,
        },
        ...previousTasks,
      ]);

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

  const applyFilterSelectedClass = (filterValue: FilterType) =>
    classNames({ selected: filter === filterValue });

  const activeTasks = tasks.filter((task) => !task.isDone);
  const completedTasks = tasks.filter((task) => task.isDone);

  const visibleTasks = () => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return activeTasks;
      case "completed":
        return completedTasks;
      default: {
        // Exhaustiveness checking
        // const _exhaustiveCheck: never = filter;
        return filter;
      }
    }
  };

  const handleClearCompletedClick = () => {
    setTasks(activeTasks);
  };

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
        <section className="main">
          <input id="toggle_all" className="toggle_all" type="checkbox" />
          <label htmlFor="toggle-all"></label>
          <ul className="todo_list">
            {visibleTasks()?.flatMap((task) => (
              <li
                key={task.id}
                className={classNames({
                  completed: task.isDone,
                  editing: task.id === taskBeingEditedId,
                })}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={task.isDone}
                    onChange={handleTaskUpdateStatusChange(task)}
                  />
                  <label
                    role="listitem"
                    onDoubleClick={handleTaskTitleLabelDoubleClick(task)}
                  >
                    {task.title}
                  </label>
                  <button
                    data-testid={`delete-task-button-${task.id}`}
                    aria-label="Clique aqui para deletar uma tarefa"
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
        <TodoListFooter
          activeTasks={activeTasks}
          onFilterChange={onFilterChange}
          applyFilterSelectedClass={applyFilterSelectedClass}
          handleClearCompletedClick={handleClearCompletedClick}
        />
      </section>
      <Footer />
    </section>
  );
}
