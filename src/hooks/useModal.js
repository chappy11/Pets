import { useMemo, useState } from "react";
import { Button, Modal, ModalHeader } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

export default function useModal(props){
    const [isOpen,setIsOpen] = useState(false);

    const handleClose = () =>{
        if(typeof props.handleClose === 'undefined'){
            setIsOpen(false);
            return
        }

        props.handleClose();
        
    }

    const handleSubmit = () =>{
        if(typeof props.handleSubmit === 'undefined'){
            setIsOpen(false);
            return;
        }

        props?.handleSubmit();
    }
    
    const displayModal = useMemo(()=>{
        return <Modal show={isOpen} >
                <Modal.Header closeButton>
                    {props.title}
                </Modal.Header>       
                <Modal.Body>
                    {props.content}
                </Modal.Body> 
                <Modal.Footer>
                    <Button onClick={()=>handleSubmit()}>Submit</Button>
                    <Button onClick={()=>handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
    },[isOpen])

    return{
        handleClose,
        setIsOpen,
        displayModal,
        isOpen
    }

}