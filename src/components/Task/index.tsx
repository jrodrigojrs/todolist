import { TaskProps } from "@/store/task";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TaskPros } from "./task.d";

export function Task({ id, title, subtitle, lastIcon, onPress }: TaskPros) {
 const [isChecked, setChecked] = useState(false);

 useEffect(() => {
  const loadTaskStatus = async () => {
   try {
    const storedTasks = await AsyncStorage.getItem("@tasks");
    if (storedTasks) {
     const allTasks = JSON.parse(storedTasks);
     const currentTask = allTasks.find((task: TaskProps) => task.id === id);
     if (currentTask) {
      setChecked(currentTask.isCompleted);
     }
    }
   } catch (error) {
    console.error("Failed to load task status:", error);
   }
  };
  loadTaskStatus();
 }, [id]);

 async function handleCompleteStatus(id: string) {
  try {
   const storedTasks = await AsyncStorage.getItem("@tasks");
   if (storedTasks) {
    const allTasks = JSON.parse(storedTasks);
    const updatedTasks = allTasks.map((task: TaskProps) => {
     if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted };
     }
     return task;
    });
    await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
    setChecked(!isChecked);
   }
  } catch (error) {
   console.error("Failed to update task status:", error);
  }
 }

 return (
  <View className="px-4 py-4 w-full flex-row items-center justify-between bg-teal-600 rounded-lg ">
   <View className="flex-row items-center">
    <Checkbox
     className="mr-2"
     value={isChecked}
     onValueChange={() => handleCompleteStatus(id)}
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
