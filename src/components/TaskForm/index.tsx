import React, { useState } from "react";
import { Alert, Keyboard, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function TaskForm() {
 const [title, setTitle] = useState<string>("");
 const [subtitle, setSubtitle] = useState<string>("");

 async function handleAddTask(title: string, subtitle: string) {

  const tasks = JSON.parse((await AsyncStorage.getItem("@tasks")) || "[]");

  const newData = {
   id: String(new Date().getTime()),
   title,
   subtitle,
   isChecked: false,
  };
  
  try {

   if (!title) {
    return Alert.alert("Aviso!!", "Por favor, preencha o Título da Tarefa");
   }
   
   await AsyncStorage.setItem("@tasks", JSON.stringify([...tasks, newData]));
   
   setTitle("");
   setSubtitle("");
   Keyboard.dismiss();

  } catch (error) {
   console.log(error);
  }
 }

 return (
  <View className="w-full mb-4">
   <Input
    placeholder="Título da Tarefa"
    onChangeText={setTitle}
    value={title}
    autoCorrect={false}
   />
   <Input
    placeholder="Descrição da Tarefa"
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
