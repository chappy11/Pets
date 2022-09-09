import { useMemo } from "react";
import { Button, Modal } from "react-bootstrap";


export default function CustomModal(props){
    const {title,message,onConfirm,onCancel,content,isOpen,btnSubmitText,btnCancelText} = props;
    console.log("PROPS",props);
    const titleView = useMemo(()=>{
        return(
            title && (
                <Modal.Title>{title}</Modal.Title>
            )
        );
    },[title]);

    const displayMessage = useMemo(()=>{
        return (
            message && (
                <p>{props.message}</p>
            )
        )
    },
    [props.message]);

    const submitButtonText = useMemo(()=>{
        return onConfirm && (
            <>
                <Button onClick={submit}>{btnSubmitText}</Button>
            </>
        )
    },[onConfirm])

    const cancelButtonText = useMemo(()=>{
        return (onCancel &&(
            <>
                <Button onClick={cancel}>{btnCancelText}</Button>
            </>
        ))
    },[onCancel])
   
    function submit(){
        onConfirm?.();
    }

    function cancel(){
        onCancel?.();
    }

    return(
        <Modal show={isOpen}>
            <Modal.Title>{titleView}</Modal.Title>
            <Modal.Body>
                {displayMessage}
                {content}
            </Modal.Body>
            <Modal.Footer>
                {submitButtonText}
                {cancelButtonText}
            </Modal.Footer>
        </Modal>
    )
}