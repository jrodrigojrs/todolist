import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { TaskPros } from "./task.d";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Task({ id, title, subtitle, lastIcon, onPress }: TaskPros) {
 const [isChecked, setChecked] = useState(false);

 return (
  <View className="px-4 py-4 w-full flex-row items-center justify-between bg-teal-600 rounded-lg ">
   <View className="flex-row items-center">
    <Checkbox
     className="mr-2"
     value={isChecked}
     onValueChange={setChecked}
     color={isChecked ? "#22C55E" : "#134E4A"}
    />
   </View>
   <View className="flex-1 px-4">
    <Text
     className={`font-medium ${isChecked ? "line-through text-teal-300" : ""}`}
    >
     {title}
    </Text>
    <Text
     className={`text-xs ${isChecked ? "line-through text-teal-300" : ""}`}
    >
     {subtitle}
    </Text>
   </View>
   <TouchableOpacity onPress={onPress}>
    {lastIcon && <FontAwesome5 name={lastIcon} size={18} color="#b5102c" />}
   </TouchableOpacity>
  </View>
 );
}
