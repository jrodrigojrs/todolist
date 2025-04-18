import { TaskProps, useTaskStore } from "@/store/task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Mantém a tela de splash visível até que o app esteja pronto
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 const [appIsReady, setAppIsReady] = useState(false);
 const { addTask } = useTaskStore();

 useEffect(() => {
  async function prepare() {
   try {
    // Carrega as tarefas do AsyncStorage
    const storedTasks = await AsyncStorage.getItem("@tasks");
    if (storedTasks) {
     const parsedTasks = JSON.parse(storedTasks);
     parsedTasks.forEach((task: TaskProps) => {
      addTask(task);
     });
    }

    // Aguarda um tempo mínimo para garantir que a UI esteja pronta
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Marca o app como pronto
    setAppIsReady(true);
   } catch (error) {
    console.error("Erro ao preparar o app:", error);
    // Mesmo com erro, marca o app como pronto após um tempo
    setTimeout(() => setAppIsReady(true), 2000);
   }
  }

  prepare();
 }, [addTask]);

 useEffect(() => {
  async function hideSplash() {
   if (appIsReady) {
    // Esconde a tela de splash quando o app estiver pronto
    await SplashScreen.hideAsync();
   }
  }

  hideSplash();
 }, [appIsReady]);

 if (!appIsReady) {
  return null;
 }

 return (
  <SafeAreaProvider>
   <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
   </Stack>
  </SafeAreaProvider>
 );
}
