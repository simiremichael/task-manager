"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../store/taskSlice";
import TaskForm from "./TaskForm";
import { RootState } from "../store/store";
import TaskFilters from "./TaskFilters";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filters = useSelector((state: RootState) => state.tasks.filters);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filters.status === "all" || task.status === filters.status;
    const priorityMatch =
      filters.priority === "all" || task.priority === filters.priority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskFilters />
      <button
        onClick={() => {
          setSelectedTask(null);
          setShowForm(true);
        }}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        Add Task
      </button>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96">
            <TaskForm task={selectedTask} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="p-4 border rounded">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button
              onClick={() => {
                setSelectedTask(task);
                setShowForm(true);
              }}
              className="mr-2 p-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="p-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
