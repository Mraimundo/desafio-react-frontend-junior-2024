import styles from "./todo-list.module.css";

export function TodoList() {
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
            <li className={styles.completed}>
              <div className={styles.view}>
                <input className={styles.toggle} type="checkbox" />
                <label>Taste JavaScript</label>
                <button className={styles.destroy}></button>
              </div>
              <input className={styles.edit} value="Taste JavaScript" />
            </li>
            <li>
              <div className={styles.view}>
                <input className={styles.toggle} type="checkbox" />
                <label>Buy a unicorn</label>
                <button className={styles.destroy}></button>
              </div>
              <input className={styles.edit} value="Buy a unicorn" />
            </li>
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
