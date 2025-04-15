import { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import TaskForm from "@/components/TaskForm";
import { useBottomSheetStore } from "@/store/bottomSheetStore";


export default function ButtonSheet() {

 const { isOpen, onClose} = useBottomSheetStore();
 const bottomSheetRef = useRef<BottomSheet>(null);
 const snapPoints = useMemo(() => ["30%", "50%"], []);

 
 return (
  <BottomSheet
   ref={bottomSheetRef}
   index={isOpen ? 0 : -1}
   enablePanDownToClose
   snapPoints={snapPoints}
   onClose={() => onClose()}
  >
   <BottomSheetView className="flex-1 p-4 items-center">
    <TaskForm />
   </BottomSheetView>
  </BottomSheet>
 );
}
