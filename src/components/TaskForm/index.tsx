import React, { useState } from "react";
import { Alert, View } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useBottomSheetStore } from "@/store/bottomSheetStore";
import { TaskProps, useTaskStore } from "@/store/task";

export default function TaskForm() {
 const [title, setTitle] = useState<string>("");
 const [subtitle, setSubtitle] = useState<string>("");
 const { addTask, tasks } = useTaskStore();
 const { onClose } = useBottomSheetStore();

 async function handleAddTask(title: string, subtitle: string) {
  try {
   if (!title || !subtitle) {
    Alert.alert("Atenção !!", "Favor preencher todos os campos!");
    setTitle("");
    setSubtitle("");
    return;
   }

   // Verificar se já existe uma tarefa com o mesmo título
   const titleExists = tasks.some(
    (task) => task.title.toLowerCase() === title.toLowerCase()
   );

   if (titleExists) {
    Alert.alert("Atenção !!", "Já existe uma tarefa com este título!");
    return;
   }

   // Gerar um ID único
   const newId = String(new Date().getTime());

   // Verificar se por algum motivo o ID já existe (extremamente improvável)
   const idExists = tasks.some((task) => task.id === newId);

   if (idExists) {
    // Se por algum milagre o ID já existir, adiciona um número aleatório
    const uniqueId = `${newId}-${Math.floor(Math.random() * 1000)}`;
    const newData: TaskProps = {
     id: uniqueId,
     title,
     subtitle,
     isCompleted: false,
    };
    addTask(newData);
   } else {
    const newData: TaskProps = {
     id: newId,
     title,
     subtitle,
     isCompleted: false,
    };
    addTask(newData);
   }

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
