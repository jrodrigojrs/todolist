import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { searchProps } from "./search";

export default function Search({ placeholder, ...rest }: searchProps) {

 return (
  <View className="flex-row justify-center items-center border-2 border-gray-400 rounded-lg mx-4 gap-2 px-3">
   <Ionicons name="search" size={20} color="black" />
   <TextInput
    className="flex-1 h-12"
    placeholder={placeholder}
    placeholderTextColor={"#808080"}
    {...rest}
   />
  </View>
 );
}
