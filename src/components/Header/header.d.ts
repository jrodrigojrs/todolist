import { TouchableOpacityProps } from "react-native";

type HeaderPros = TouchableOpacityProps & {
 headerTitle: string;
 headerSubtitle?: string;
 initialIcon?: keyof typeof FontAwesome5.glyphMap;
 lastIcon: keyof typeof FontAwesome5.glyphMap;
};
