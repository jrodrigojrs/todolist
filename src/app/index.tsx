import React, { useEffect, useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { TaskProps, useTaskStore } from "@/store/task";

import "../../global.css";

import BottomSheetComponent from "@/components/BottomSheetComponent";
import EmptyList from "@/components/EmptyList";
import { Header } from "@/components/Header";
import Search from "@/components/Search";
import { Task } from "@/components/Task";
import BottomSheet from "@gorhom/bottom-sheet";

export default function App() {
 const { tasks, removeTask } = useTaskStore();
 const [searchQuery, setSearchQuery] = useState<string>("");
 const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);

 useEffect(() => {
  const loadTasks = async () => {
   try {
    const storedTasks = await AsyncStorage.getItem("@tasks");
    if (storedTasks) {
     const parsedTasks = JSON.parse(storedTasks);
     parsedTasks.forEach((task: TaskProps) => {
      useTaskStore.getState().addTask(task);
     });
    }
   } catch (error) {
    console.error("Failed to load tasks:", error);
   }
  };
  loadTasks();
 }, []);

 useEffect(() => {
  const saveTasks = async () => {
   try {
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
   } catch (error) {
    console.error("Failed to save tasks:", error);
   }
  };
  saveTasks();
 }, [tasks]);

 useEffect(() => {
  if (searchQuery === "") {
   setFilteredTasks(tasks);
  } else {
   const filtered = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
   );
   setFilteredTasks(filtered);
  }
 }, [searchQuery, tasks]);

 const handleBottomSheetOpen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  bottomSheetRef.current?.expand();
 };

 return (
  <GestureHandlerRootView className="flex-1">
   <SafeAreaView className="flex-1 bg-teal-100">
    <StatusBar
     barStyle="dark-content"
     translucent
     backgroundColor="transparent"
    />
    <Header
     headerTitle="Lista de Tarefas"
     headerSubtitle="Organize seu dia !!"
     initialIcon="tasks"
     lastIcon="pencil-alt"
     onPress={handleBottomSheetOpen}
    />

    <Search
     placeholder="Buscar tarefa ..."
     onChangeText={setSearchQuery}
     value={searchQuery}
    />

    <View className="flex-1 m-4">
     <FlatList
      data={[...filteredTasks].reverse()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }: { item: TaskProps }) => (
       <Task
        id={item.id}
        title={item.title}
        subtitle={item.subtitle}
        lastIcon="trash-alt"
        onPress={() => removeTask(item.id)}
       />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <EmptyList />}
     />
    </View>
    <BottomSheetComponent />
   </SafeAreaView>
  </GestureHandlerRootView>
 );
}
