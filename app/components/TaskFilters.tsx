import React from "react";
import { useDispatch } from "react-redux";
import { setStatusFilter, setPriorityFilter } from "../store/taskSlice";

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex space-x-4 mb-4">
      <select
        onChange={(e) =>
          dispatch(
            setStatusFilter(
              e.target.value as "all" | "todo" | "in-progress" | "done"
            )
          )
        }
        className="p-2 border rounded"
      >
        <option value="all">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select
        onChange={(e) =>
          dispatch(
            setPriorityFilter(
              e.target.value as "all" | "low" | "medium" | "high"
            )
          )
        }
        className="p-2 border rounded"
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default TaskFilters;
