import React, { useEffect, useMemo, useRef, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
 FlatList,
 KeyboardAvoidingView,
 StatusBar,
 Text,
 View,
} from "react-native";

import "../../global.css";

import { Header } from "@/components/Header";
import Search from "@/components/Search";
import { Task } from "@/components/Task";
import TaskForm from "@/components/TaskForm";
import BottomSheetComponent from "@/components/BottomSheetComponent";
import BottomSheet from "@gorhom/bottom-sheet";

export default function App() {
 type taskProps = {
  id: string;
  title: string;
  subtitle: string;
  isChecked: boolean;
  onPress: () => void;
 };
 type TaskFormProps = {
  onPress: (id: string) => void;
 };

 const [tasks, setTasks] = useState<taskProps[]>([]);
 const [searchQuery, setSearchQuery] = useState<string>("");

 useEffect(() => {
  const loadTasks = async () => {
   try {
    const storedTasks = await AsyncStorage.getItem("@tasks");
    if (storedTasks) {
     setTasks(JSON.parse(storedTasks));
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

 const onSearch = (query: string) => {
  const filteredTasks = tasks.filter((task) =>
   task.title.toLowerCase().includes(query.toLowerCase())
  );
  setTasks(filteredTasks);
 };

 useEffect(() => {
  onSearch(searchQuery);
 }, [searchQuery]);

 const bottomSheetRef = useRef<BottomSheet>(null);
 const handleClose = () => {
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
     onPress={() => handleClose()}
    />
    <Search
     placeholder="Buscar tarefa ..."
     onChangeText={(text) => setSearchQuery(text)}
     value={searchQuery}
    />
    <View className="flex-1 m-4">
     <FlatList
      data={[...tasks].reverse()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }: { item: taskProps }) => (
       <Task
        id={item.id}
        title={item.title}
        subtitle={item.subtitle}
        lastIcon="trash-alt"
        onPress={() => setTasks(tasks.filter((task) => task.id !== item.id))}
       />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // gap horizontal
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
       <Text className="text-center">Não há tarefas cadastradas</Text>
      )}
     />
    </View>
    <BottomSheetComponent />
   </SafeAreaView>
  </GestureHandlerRootView>
 );
}
