"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../store/taskSlice";
import { toast } from "react-toastify";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, selectedTask }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(selectedTask?.title || "");
  const [description, setDescription] = useState(
    selectedTask?.description || ""
  );
  const [dueDate, setDueDate] = useState(selectedTask?.dueDate || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    selectedTask?.priority || "low"
  );
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">(
    selectedTask?.status || "todo"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: Date.now().toString(), // Generate a unique ID
      title,
      description,
      dueDate,
      priority,
      status,
    };

    if (selectedTask) {
      dispatch(editTask({ id: selectedTask?.id, updatedTask: newTask }));
    } else {
      // Dispatch the addTask action
      dispatch(addTask(newTask));
    }

    // Show a success toast
    toast.success("Task added successfully!");

    // Close the form
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "low" | "medium" | "high")
        }
        className="w-full p-2 border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "todo" | "in-progress" | "done")
        }
        className="w-full p-2 border rounded"
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
};

export default TaskForm;
