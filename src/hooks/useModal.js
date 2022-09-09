import { useCallback, useMemo, useState } from "react";
import { Button, Modal, ModalHeader } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import CustomModal from "../components/CustomModal";

export default function useModal(){
    const [alertOption,setAlertOption] = useState(null);

    const closeAlertModal = useCallback(()=>{
        setAlertOption((prevState)=>({
            ...prevState,
            isOpen:false,
        }))
    },[setAlertOption])
    
    const handleCancel = useCallback(()=>{
        closeAlertModal();

        alertOption.onCancel?.();
    },[alertOption,closeAlertModal])
  
    const handleSubmit = useCallback(()=>{
        alertOption?.onConfirm?.();
    },[alertOption]);

  const displayModal = useCallback(() =>{
    return <>
        <CustomModal
            {...alertOption}
            onCancel={handleCancel}
            onConfirm={handleSubmit}
        />
    </>
   },[alertOption])
   
    return{
      setAlertOption,
      alertOption,
      displayModal,
      closeAlertModal,
    }

}