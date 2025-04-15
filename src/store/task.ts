import { create } from "zustand";

type Task = {
 id: string;
 title: string;
 subtitle: string;
 isCompleted: boolean;
};

type TaskStore = {
 tasks: Task[];
 onSearch: (query: string) => void;
 addTask: (task: Task) => void;
 removeTask: (id: string) => void;
 updateTask: (task: Task) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
 tasks: [],
 onSearch: (query: string) => set(({ tasks }) => ({ tasks: tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())) })),
 addTask: (task: Task) => set(({ tasks }) => ({ tasks: [...tasks, task] })),
 removeTask: (id: string) => set(({ tasks }) => ({ tasks: tasks.filter((t) => t.id !== id) })),
 updateTask: (task: Task) => set(({ tasks }) => ({ tasks: tasks.map((t) => (t.id === task.id ? task : t)) })),
}));


