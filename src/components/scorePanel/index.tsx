import { View, Text } from "react-native";
import { useTaskStore } from "@/store/task";
import { Button } from "../Button";

export function ScorePanel() {
  const { tasks } = useTaskStore();
  
  const completedTasks = tasks.filter(task=> task.isCompleted).length;
  const totalTasks = tasks.length;

  return (
    <View className="flex-row justify-between items-center w-full px-4 py-2 mb-4  rounded-lg">
      <View className="flex-row gap-2 items-center">
        <Text className="text-sm text-gray-600">Criadas</Text>
        <Text className="text-lg font-bold text-gray-800">{totalTasks}</Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Text className="text-sm text-gray-600">Concluídas</Text>
        <Text className="text-lg font-bold text-gray-800 ">{completedTasks}</Text>
      </View>
    </View>
  );
}
