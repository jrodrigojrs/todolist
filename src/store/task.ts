import { create } from "zustand";

export type TaskProps = {
 id: string;
 title: string;
 subtitle: string;
 isCompleted: boolean;
};

export type TaskStore = {
 tasks: TaskProps[];
 onSearch: (query: string) => void;
 addTask: (task: TaskProps) => void;
 removeTask: (id: string) => void;
 updateTask: (task: TaskProps) => void;
 removeAllCompletedTasks: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
 tasks: [],
 onSearch: (query: string) =>
  set(({ tasks }) => ({
   tasks: tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
   ),
  })),
 addTask: (task: TaskProps) =>
  set(({ tasks }) => ({ tasks: [...tasks, task] })),
 removeTask: (id: string) =>
  set(({ tasks }) => ({ tasks: tasks.filter((t) => t.id !== id) })),
 removeAllCompletedTasks: () =>
  set(({ tasks }) => ({ tasks: tasks.filter((t) => !t.isCompleted) })),
 updateTask: (task: TaskProps) =>
  set(({ tasks }) => ({
   tasks: tasks.map((t) => (t.id === task.id ? task : t)),
  })),
}));
