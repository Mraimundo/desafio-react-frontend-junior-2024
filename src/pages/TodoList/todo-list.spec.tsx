import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./todo-list";

const onFilterChangeMock = jest.fn();
const setTasksMock = jest.fn();
const tasksMock = [
  { id: 1, title: "Lavar os pratos", isDone: false },
  { id: 2, title: "Cortar a grama", isDone: true },
  { id: 3, title: "Comprar pão", isDone: false },
];
describe("TodoList component", () => {
  it("should render tasks correctly", () => {
    const { getByText, getByPlaceholderText, getAllByRole } = render(
      <MemoryRouter>
        <TodoList
          filter="all"
          tasks={tasksMock}
          setTasks={setTasksMock}
          onFilterChange={onFilterChangeMock}
        />
      </MemoryRouter>
    );

    expect(getByText("todos")).toBeInTheDocument();
    expect(getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
    expect(getByText("Lavar os pratos")).toBeInTheDocument();
    expect(getByText("Cortar a grama")).toBeInTheDocument();
    expect(getByText("Comprar pão")).toBeInTheDocument();
    expect(getAllByRole("listitem")).toHaveLength(9);
  });

  it("should allow adding new tasks", () => {
    const { container } = render(
      <MemoryRouter>
        <TodoList
          filter="all"
          tasks={tasksMock}
          setTasks={setTasksMock}
          onFilterChange={onFilterChangeMock}
        />
      </MemoryRouter>
    );

    const inputElement = container.querySelector(
      ".new_todo"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(setTasksMock).toHaveBeenCalledTimes(1);
    expect(setTasksMock).toHaveBeenCalledWith(expect.any(Function));
    expect(inputElement.value).toBe("");
  });
  it("should allows deleting tasks", () => {
    const { getByTestId, queryByText } = render(
      <MemoryRouter>
        <TodoList
          filter="all"
          tasks={tasksMock}
          setTasks={setTasksMock}
          onFilterChange={onFilterChangeMock}
        />
      </MemoryRouter>
    );

    const deleteButton = getByTestId("delete-task-button-3");
    userEvent.click(deleteButton);

    expect(queryByText("Comprar pão")).toBeInTheDocument();
  });
});
