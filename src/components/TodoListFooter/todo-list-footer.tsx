import { FilterType, TaskType } from "../../pages/TodoList/todo-list";
import "./todo-list-footer.css";

type TodoListFooterProps = {
  activeTasks: TaskType[];
  applyFilterSelectedClass: (filterValue: FilterType) => string;
  handleClearCompletedClick: () => void;
  onFilterChange: (filter: FilterType) => void;
};

export function TodoListFooter({
  activeTasks,
  onFilterChange,
  applyFilterSelectedClass,
  handleClearCompletedClick,
}: TodoListFooterProps) {
  return (
    <footer className="footer">
      <span className="todo_count">
        <strong>{activeTasks.length}</strong> item
        {activeTasks.length !== 1 && "s"} left
      </span>
      <ul className="filters">
        <li>
          <button
            className={applyFilterSelectedClass("all")}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={applyFilterSelectedClass("active")}
            onClick={() => onFilterChange("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={applyFilterSelectedClass("completed")}
            onClick={() => onFilterChange("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
      <button className="clear_completed" onClick={handleClearCompletedClick}>
        Clear completed
      </button>
    </footer>
  );
}
