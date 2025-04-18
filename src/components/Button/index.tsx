import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export function Button({ title, onPress }: Props) {
 return (
  <TouchableOpacity
   className="items-center justify-center h-14  bg-teal-600 rounded-md mb-4"
   onPress={onPress}
   activeOpacity={0.7}
  >
   <Text className="font-medium">{title}</Text>
  </TouchableOpacity>
 );
}
