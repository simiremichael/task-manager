import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("TaskForm", () => {
  it("displays an error toast when adding a task fails", async () => {
    render(
      <Provider store={store}>
        <TaskForm onClose={() => {}} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to save the task. Please try again."
    );
  });
});
