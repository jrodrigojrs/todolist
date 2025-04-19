import { TaskProps, useTaskStore } from "@/store/task";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TaskPros } from "./task.d";

export function Task({ id, title, subtitle, lastIcon, onPress }: TaskPros) {
 const [isChecked, setChecked] = useState(false);
 const { updateTask, selectedTasks, toggleTaskSelection } = useTaskStore();

 // Load task status from AsyncStorage
 useEffect(() => {
  const loadTaskStatus = async () => {
   try {
    const storedTasks = await AsyncStorage.getItem("@tasks");
    if (!storedTasks) return;

    const allTasks = JSON.parse(storedTasks);
    const currentTask = allTasks.find((task: TaskProps) => task.id === id);

    if (currentTask) {
     setChecked(currentTask.isCompleted);
    }
   } catch (error) {
    console.error("Failed to load task status:", error);
   }
  };

  loadTaskStatus();
 }, [id]);

 // Handle checkbox toggle with useCallback for better performance
 const handleCompleteStatus = useCallback(async () => {
  try {
   const storedTasks = await AsyncStorage.getItem("@tasks");
   if (!storedTasks) return;

   const allTasks = JSON.parse(storedTasks);
   const updatedTasks = allTasks.map((task: TaskProps) => {
    if (task.id === id) {
     const updatedTask = { ...task, isCompleted: !task.isCompleted };
     // Update global state
     updateTask(updatedTask);
     return updatedTask;
    }
    return task;
   });

   await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
   setChecked((prev) => !prev);
  } catch (error) {
   console.error("Failed to update task status:", error);
  }
 }, [id, updateTask]);

 const isSelected = selectedTasks.includes(id);

 return (
  <View
   className={`px-4 py-4 w-full flex-row items-center justify-between bg-teal-600 rounded-lg ${
    isSelected ? "border-2 border-teal-300" : ""
   }`}
  >
   <View className="flex-row items-center">
    <Checkbox
     className="mr-2"
     value={isChecked}
     onValueChange={handleCompleteStatus}
     color={isChecked ? "#22C55E" : "#134E4A"}
    />
   </View>
   <View className="flex-1 px-4">
    <Text
     className={`font-medium ${isChecked ? "line-through text-teal-300" : ""}`}
    >
     {title}
    </Text>
    <Text
     className={`text-xs ${isChecked ? "line-through text-teal-300" : ""}`}
    >
     {subtitle}
    </Text>
   </View>
   <TouchableOpacity onPress={onPress}>
    {lastIcon && <FontAwesome5 name={lastIcon} size={18} color="#b5102c" />}
   </TouchableOpacity>
  </View>
 );
}
