
import taskReducer, { addTask, editTask, deleteTask } from "./taskSlice";
// import { Task } from './taskSlice';
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}
describe("taskSlice", () => {
  const initialState = { tasks: [] };

  it("should handle adding a task", () => {
    const task: Task = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
      dueDate: "2023-10-31",
      priority: "high",
      status: "todo",
    };
    const action = addTask(task);
    const state = taskReducer(initialState, action);
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual(task);
  });

  it("should handle editing a task", () => {
    const task: Task = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
      dueDate: "2023-10-31",
      priority: "high",
      status: "todo",
    };
    const initialState = { tasks: [task] };
    const updatedTask = { ...task, title: "Updated Task" };
    const action = editTask({ id: "1", updatedTask });
    const state = taskReducer(initialState, action);
    expect(state.tasks[0].title).toBe("Updated Task");
  });

  it("should handle deleting a task", () => {
    const task: Task = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
      dueDate: "2023-10-31",
      priority: "high",
      status: "todo",
    };
    const initialState = { tasks: [task] };
    const action = deleteTask("1");
    const state = taskReducer(initialState, action);
    expect(state.tasks).toHaveLength(0);
  });
});
