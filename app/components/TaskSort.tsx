"use client";

import React from "react";

interface TaskSortProps {
  onSortChange: (sortBy: "dueDate" | "priority" | "none") => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ onSortChange }) => {
  return (
    <div className="mb-4">
      <select
        onChange={(e) =>
          onSortChange(e.target.value as "dueDate" | "priority" | "none")
        }
        className="p-2 border rounded"
      >
        <option value="none">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default TaskSort;
