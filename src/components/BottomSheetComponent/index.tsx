import { useBottomSheetStore } from "@/store/bottomSheetStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";

import TaskForm from "@/components/TaskForm";

export  function BottomSheetComponent() {
 const { isOpen, onClose } = useBottomSheetStore();
 const bottomSheetRef = useRef<BottomSheet>(null);
 const snapPoints = useMemo(() => ["68%"], []);

 return (
  <BottomSheet
   ref={bottomSheetRef}
   index={isOpen ? 0 : -1}
   enablePanDownToClose
   snapPoints={snapPoints}
   keyboardBehavior="interactive"
   keyboardBlurBehavior="restore"
   android_keyboardInputMode="adjustResize"
   enableHandlePanningGesture={true}
   enableContentPanningGesture={true}
   onClose={onClose}
  >
   <BottomSheetView className="flex-1 p-4 items-center">
    <TaskForm />
   </BottomSheetView>
  </BottomSheet>
 );
}
