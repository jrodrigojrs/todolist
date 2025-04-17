import React, { useState } from "react";
import { Alert, View } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useBottomSheetStore } from "@/store/bottomSheetStore";
import { TaskProps, useTaskStore } from "@/store/task";

export default function TaskForm() {
 const [title, setTitle] = useState<string>("");
 const [subtitle, setSubtitle] = useState<string>("");
 const { addTask } = useTaskStore();
 const { onClose } = useBottomSheetStore();

 async function handleAddTask(title: string, subtitle: string) {
  try {
   if (!title || !subtitle) {
    Alert.alert("Atenção !!", "Favor preencher todos os campos!");
    setTitle("");
    setSubtitle("");
    return;
   }
   const newData: TaskProps = {
    id: String(new Date().getTime()),
    title,
    subtitle,
    isCompleted: false,
   };
   addTask(newData);
   setTitle("");
   setSubtitle("");
   onClose();
  } catch (error) {
   console.error("Failed to add task:", error);
  }
 }

 return (
  <View className="w-full mb-4">
   <Input
    placeholder="Título da Tarefa"
    onChangeText={setTitle}
    value={title}
    autoCorrect={false}
   />
   <Input
    placeholder="Descrição da Tarefa"
    onChangeText={setSubtitle}
    value={subtitle}
    autoCorrect={false}
   />
   <Button
    title="Cadastrar Tarefa"
    onPress={() => handleAddTask(title, subtitle)}
   />
  </View>
 );
}
