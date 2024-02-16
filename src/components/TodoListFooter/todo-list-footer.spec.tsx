import { render, fireEvent } from "@testing-library/react";
import { TodoListFooter } from "./todo-list-footer";

const onFilterChangeMock = jest.fn();
const handleClearCompletedClickMock = jest.fn();
const applyFilterSelectedClassMock = jest.fn();
const tasksMock = [
  { id: 1, title: "Lavar os pratos", isDone: false },
  { id: 2, title: "Cortar a grama", isDone: true },
  { id: 3, title: "Comprar pão", isDone: false },
];

describe("TodoListFooter component", () => {
  it("should renders correctly", () => {
    const { getByText } = render(
      <TodoListFooter
        activeTasks={tasksMock}
        onFilterChange={onFilterChangeMock}
        handleClearCompletedClick={handleClearCompletedClickMock}
        applyFilterSelectedClass={applyFilterSelectedClassMock}
      />
    );

    expect(getByText("All")).toBeInTheDocument();
    expect(getByText("Active")).toBeInTheDocument();
    expect(getByText("Completed")).toBeInTheDocument();
    expect(getByText("Clear completed")).toBeInTheDocument();
  });

  it("should calls onFilterChange with correct filter when buttons are clicked", () => {
    const { getByText } = render(
      <TodoListFooter
        activeTasks={tasksMock}
        onFilterChange={onFilterChangeMock}
        applyFilterSelectedClass={applyFilterSelectedClassMock}
        handleClearCompletedClick={handleClearCompletedClickMock}
      />
    );

    fireEvent.click(getByText("All"));
    expect(onFilterChangeMock).toHaveBeenCalledWith("all");

    fireEvent.click(getByText("Active"));
    expect(onFilterChangeMock).toHaveBeenCalledWith("active");

    fireEvent.click(getByText("Completed"));
    expect(onFilterChangeMock).toHaveBeenCalledWith("completed");
  });
  it('should calls handleClearCompletedClick when "Clear completed" button is clicked', () => {
    const { getByText } = render(
      <TodoListFooter
        activeTasks={tasksMock}
        onFilterChange={onFilterChangeMock}
        applyFilterSelectedClass={applyFilterSelectedClassMock}
        handleClearCompletedClick={handleClearCompletedClickMock}
      />
    );

    fireEvent.click(getByText("Clear completed"));
    expect(handleClearCompletedClickMock).toHaveBeenCalled();
  });
});
