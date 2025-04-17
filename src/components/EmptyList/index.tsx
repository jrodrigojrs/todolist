import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function EmptyList() {
 return (
  <View className="flex-1 flex-row justify-center items-center gap-4  p-4 rounded-2xl">
   <Ionicons name="warning-outline" size={50} color="black" />
   <View className="gap-2 justify-center">
    <Text className="font-bold">Nenhuma tarefa cadastrada !!</Text>
    <View className="flex-row gap-4 items-center">
     <Text className="font-medium">Cadastre uma tarefa !!</Text>
     <FontAwesome5 name="pencil-alt" size={22} color="black" />
    </View>
   </View>
  </View>
 );
}
