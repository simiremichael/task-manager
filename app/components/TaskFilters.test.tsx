import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskFilters from "./TaskFilters";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("TaskFilters", () => {
  it("updates the status filter", () => {
    render(
      <Provider store={store}>
        <TaskFilters />
      </Provider>
    );

    const statusFilter = screen.getByRole("combobox", {
      name: "Status Filter",
    });
    fireEvent.change(statusFilter, { target: { value: "todo" } });
    expect(statusFilter?.value).toBe("todo");
  });

  it("updates the priority filter", () => {
    render(
      <Provider store={store}>
        <TaskFilters />
      </Provider>
    );

    const priorityFilter = screen.getByRole("combobox", {
      name: "Priority Filter",
    });
    fireEvent.change(priorityFilter, { target: { value: "high" } });
    expect(priorityFilter?.value).toBe("high");
  });
});
