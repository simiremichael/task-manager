
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
}

interface TaskState {
  tasks: Task[];
  filters: {
    status: 'all' | 'todo' | 'in-progress' | 'done';
    priority: 'all' | 'low' | 'medium' | 'high';
  };
  searchQuery: string;
  sortBy: 'dueDate' | 'priority' | 'none';
}

// Load tasks from local storage
const loadTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
 
  return tasks ? JSON.parse(tasks) : [];
};

const initialState: TaskState = {
  tasks: loadTasks(),
  filters: {
    status: 'all',
    priority: 'all',
  },
  searchQuery: '',
  sortBy: 'none',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state?.tasks));
    },
    editTask: (state, action: PayloadAction<{ id: string; updatedTask: Partial<Task> }>) => {
      const task = state?.tasks?.find((t) => t?.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload.updatedTask);
        localStorage.setItem('tasks', JSON.stringify(state?.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state?.tasks?.filter((task) => task?.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state?.tasks));
    },
    setStatusFilter: (state, action: PayloadAction<'all' | 'todo' | 'in-progress' | 'done'>) => {
      state.filters.status = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<'all' | 'low' | 'medium' | 'high'>) => {
      state.filters.priority = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'dueDate' | 'priority' | 'none'>) => {
      state.sortBy = action.payload;
    },
  },
});

// Selector to get filtered, sorted, and searched tasks
export const selectProcessedTasks = (state: { tasks: TaskState }) => {
   const { tasks, filters, searchQuery, sortBy } = state?.tasks;

  // Filter tasks
  const filteredTasks = tasks?.filter((task) => {
    const statusMatch = filters?.status === 'all' || task?.status === filters?.status;
    const priorityMatch = filters?.priority === 'all' || task?.priority === filters?.priority;
    const searchMatch =
      task?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      task?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return statusMatch && priorityMatch && searchMatch;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks]?.sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a?.dueDate).getTime() - new Date(b?.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a?.priority] - priorityOrder[b?.priority];
    }
    return 0;
  });

  return sortedTasks;
};

export const { addTask, editTask, deleteTask, setStatusFilter, setPriorityFilter, setSearchQuery, setSortBy } = taskSlice.actions;
export default taskSlice.reducer;