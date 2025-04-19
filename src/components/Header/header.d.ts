import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

type HeaderPros = TouchableOpacityProps & {
 headerTitle: string;
 headerSubtitle?: string;
 initialIcon?: keyof typeof FontAwesome5.glyphMap;
 lastIcon: keyof typeof MaterialCommunityIcons.glyphMap;
 selectAllIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
 deleteAllIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
 filterIcon?: keyof typeof Feather.glyphMap;
 onFilterPress?: () => void;
 onDeletePress?: () => void;
 onSelectAllPress?: () => void;
};
