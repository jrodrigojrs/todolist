export type TaskPros = {
 id: string;
 title: string;
 subtitle?: string;
 lastIcon?: keyof typeof FontAwesome5.glyphMap;
 onPress?: () => void;
};
