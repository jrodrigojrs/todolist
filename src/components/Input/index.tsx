import { TextInput, View } from "react-native";
import { Props } from "./input.d";

export function Input({ placeholder,onChangeText,value }: Props) {
 return (
  <View className="rounded-lg border-2 border-gray-400  mb-4">
   <TextInput
    className="h-12 px-4"
    placeholder={placeholder}
    placeholderTextColor={"#808080"}
    onChangeText={onChangeText}
    value={value}
    keyboardType="email-address"
   />
  </View>
 );
}
