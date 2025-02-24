"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  selectProcessedTasks,
  setStatusFilter,
  setPriorityFilter,
  setSearchQuery,
  setSortBy,
  editTask,
} from "../store/taskSlice";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import TaskSearch from "./TaskSearch";
import TaskSort from "./TaskSort";
import TaskDetails from "./TaskDetails";
import { toast } from "react-toastify";

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
  const processedTasks = useSelector(selectProcessedTasks);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskSearch onSearch={(query) => dispatch(setSearchQuery(query))} />
      <TaskFilters
        onFilterChange={(filterType: string, value: string) => {
          if (filterType === "status") {
            dispatch(
              setStatusFilter(value as "all" | "todo" | "in-progress" | "done")
            );
          } else if (filterType === "priority") {
            dispatch(
              setPriorityFilter(value as "all" | "low" | "medium" | "high")
            );
          }
        }}
      />
      <TaskSort onSortChange={(sortBy) => dispatch(setSortBy(sortBy))} />
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
            <TaskForm
              onClose={() => setShowForm(false)}
              selectedTask={selectedTask}
            />
          </div>
        </div>
      )}
      {showDetails && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setShowDetails(false)}
          onUpdate={(updatedTask) => {
            dispatch(editTask({ id: selectedTask?.id, updatedTask }));
            setShowDetails(false);
          }}
        />
      )}
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processedTasks?.map((task) => (
          <div
            key={task?.id}
            className="p-4 border rounded cursor-pointer"
            onClick={() => {
              setSelectedTask(task);
              setShowDetails(true);
            }}
          >
            <h3 className="font-bold">{task?.title}</h3>
            <p>{task?.description}</p>
            <p>Due: {new Date(task?.dueDate)?.toLocaleDateString()}</p>
            <p>Priority: {task?.priority}</p>
            <p>Status: {task?.status}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTask(task);
                setShowForm(true);
              }}
              className="mr-2 p-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(task?.id);
              }}
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
