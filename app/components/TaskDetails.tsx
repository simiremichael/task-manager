"use client";

import React, { useState } from "react";
// import { Task } from "@/app/store/taskApi";
import { toast } from "react-toastify";
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}
interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Partial<Task>) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  onClose,
  onUpdate,
}) => {
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    onUpdate({ status, priority });
    toast.success("Task updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">{task.title}</h2>
        <p className="mb-2">{task.description}</p>
        <p className="mb-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
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
        </div>
        <div className="mb-4">
          <label className="block mb-2">Priority</label>
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
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
