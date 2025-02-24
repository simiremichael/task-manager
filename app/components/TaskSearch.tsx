'use client';

import React from 'react';

interface TaskSearchProps {
  onSearch: (query: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search tasks by title or description"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default TaskSearch;