import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { HeaderPros } from "./header";

import { useBottomSheetStore } from "@/store/bottomSheetStore";

export function Header({
 headerTitle,
 headerSubtitle,
 initialIcon,
 lastIcon,
 filterIcon,
 onFilterPress,
 ...rest
}: HeaderPros) {
 const { onOpen } = useBottomSheetStore();
 function handleBottomSheetOpen() {
  onOpen();
 }

 return (
  <View className="px-4 py-4 flex-row items-center justify-between bg-teal-600 my-4 gap-4">
   {initialIcon && <FontAwesome5 name={initialIcon} size={24} color="black" />}
   <View className="flex-1 self-start px-4">
    <Text className="font-medium text-md">{headerTitle}</Text>
    <Text className="text-xs">{headerSubtitle}</Text>
   </View>

   <View className="flex-row gap-4">
    {filterIcon && (
     <TouchableOpacity onPress={onFilterPress} activeOpacity={0.7}>
      <Feather name={filterIcon} size={24} color="black" />
     </TouchableOpacity>
    )}
    <TouchableOpacity onPress={handleBottomSheetOpen} activeOpacity={0.7}>
     {lastIcon && <FontAwesome5 name={lastIcon} size={24} color="black" />}
    </TouchableOpacity>
   </View>
  </View>
 );
}
