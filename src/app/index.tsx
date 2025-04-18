import React, { useEffect, useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, FlatList, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { TaskProps, useTaskStore } from "@/store/task";

import "../../global.css";

import { BottomSheetComponent } from "@/components/BottomSheetComponent";
import { EmptyList } from "@/components/EmptyList";
import { Header } from "@/components/Header";
import { ScorePanel } from "@/components/ScorePanel";
import { Search } from "@/components/Search";
import { Task } from "@/components/Task";
import BottomSheet from "@gorhom/bottom-sheet";

export default function App() {
 const { tasks, removeTask, removeAllCompletedTasks } = useTaskStore();
 const [searchQuery, setSearchQuery] = useState<string>("");
 const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
 const [isSearchVisible, setIsSearchVisible] = useState(false);

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

 const handleDeleteCompletedTasks = () => {
  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  if (completedTasksCount === 0) {
   Alert.alert("Aviso", "Não há tarefas concluídas para excluir.");
   return;
  }

  Alert.alert(
   "Confirmar exclusão",
   `Deseja realmente excluir todas as ${completedTasksCount} tarefas concluídas?`,
   [
    {
     text: "Cancelar",
     style: "cancel",
    },
    {
     text: "Sim, excluir",
     onPress: () => removeAllCompletedTasks(),
     style: "destructive",
    },
   ]
  );
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
     lastIcon="clipboard-edit-outline"
     deleteIcon="delete-sweep-outline"
     filterIcon="filter"
     onDeletePress={handleDeleteCompletedTasks}
     onPress={handleBottomSheetOpen}
     onFilterPress={() => setIsSearchVisible(!isSearchVisible)}
    />
    <ScorePanel />

    {isSearchVisible && (
     <Search
      placeholder="Buscar tarefa ..."
      onChangeText={setSearchQuery}
      value={searchQuery}
     />
    )}

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
