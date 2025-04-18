import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export  function EmptyList() {
 return (
  <View className="flex-1 justify-center items-center gap-4  p-4 rounded-2xl">
   <MaterialCommunityIcons
    name="clipboard-text-off-outline"
    size={70}
    color="black"
   />
   <View className="gap-2 justify-center">
    <Text className="font-bold">Você ainda não tem tarefas cadastradas !!</Text>
    <View className="flex-row gap-4 items-center">
     <Text className="font-medium">
      Crie tarefas e organize seus itens a fazer !!
     </Text>
     <MaterialCommunityIcons name="clipboard-edit-outline" size={30} color="black" />
    </View>
   </View>
  </View>
 );
}
