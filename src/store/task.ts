import { create } from "zustand";

export type TaskProps = {
 id: string;
 title: string;
 subtitle: string;
 isCompleted: boolean;
};

export type TaskStore = {
 tasks: TaskProps[];
 selectedTasks: string[];
 onSearch: (query: string) => void;
 addTask: (task: TaskProps) => void;
 removeTask: (id: string) => void;
 updateTask: (task: TaskProps) => void;
 removeAllCompletedTasks: () => void;
 toggleSelectAll: () => void;
 toggleTaskSelection: (id: string) => void;
 markAllTasksAsCompleted: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
 tasks: [],
 selectedTasks: [],
 onSearch: (query: string) =>
  set(({ tasks }) => ({
   tasks: tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
   ),
  })),
 addTask: (task: TaskProps) =>
  set(({ tasks }) => ({ tasks: [...tasks, task] })),
 removeTask: (id: string) =>
  set(({ tasks, selectedTasks }) => ({
   tasks: tasks.filter((t) => t.id !== id),
   selectedTasks: selectedTasks.filter((t) => t !== id),
  })),
 removeAllCompletedTasks: () =>
  set(({ tasks }) => ({ tasks: tasks.filter((t) => !t.isCompleted) })),
 updateTask: (task: TaskProps) =>
  set(({ tasks }) => ({
   tasks: tasks.map((t) => (t.id === task.id ? task : t)),
  })),
 toggleSelectAll: () =>
  set(({ tasks, selectedTasks }) => ({
   selectedTasks:
    selectedTasks.length === tasks.length ? [] : tasks.map((t) => t.id),
  })),
 toggleTaskSelection: (id: string) =>
  set(({ selectedTasks }) => ({
   selectedTasks: selectedTasks.includes(id)
    ? selectedTasks.filter((t) => t !== id)
    : [...selectedTasks, id],
  })),
 markAllTasksAsCompleted: () =>
  set(({ tasks }) => ({
   tasks: tasks.map((task) => ({ ...task, isCompleted: true })),
  })),
}));
