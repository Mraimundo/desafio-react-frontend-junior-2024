import { useEffect, useState } from "react";
import classNames from "classnames";
import data from "../../data/todos.json";
import styles from "./todo-list.module.css";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function TodoList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    setTasks(data.todos);
  }, []);

  return (
    <section className={styles.wrapper}>
      <h1>todos</h1>
      <section className={styles.todoapp}>
        <header className={styles.header}>
          <input
            className={styles.new_todo}
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>

        <section className={styles.main}>
          <input
            id="toggle_all"
            className={styles.toggle_all}
            type="checkbox"
          />
          <label htmlFor="toggle-all"></label>
          <ul className={styles.todo_list}>
            {tasks.flatMap((task) => (
              <li
                key={task.id}
                className={classNames({
                  completed: task.isDone,
                })}
              >
                <div className={styles.view}>
                  <input
                    className={styles.toggle}
                    type="checkbox"
                    checked={task.isDone}
                  />
                  <label>{task.title}</label>
                  <button className={styles.destroy}></button>
                </div>
                <input className={styles.edit} value="Taste JavaScript" />
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <span className={styles.todo_count}>
            <strong>0</strong> item left
          </span>
          <ul className={styles.filters}>
            <li>
              <a className={styles.selected} href="#/">
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
          <button className={styles.clear_completed}>Clear completed</button>
        </footer>
      </section>

      <footer className={styles.info}>
        <p>Double-click to edit a todo</p>
        <p>
          Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        <p>Created by Mouzinho Raimundo</p>
      </footer>
    </section>
  );
}
