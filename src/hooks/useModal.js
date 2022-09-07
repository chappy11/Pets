import { useMemo, useState } from "react";
import { Button, Modal, ModalHeader } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

export default function useModal(props){
    const [isOpen,setIsOpen] = useState(false);
    
    const displayModal = useMemo(()=>{
        return <Modal show={isOpen} >
                <Modal.Header closeButton>
                    {props.title}
                </Modal.Header>       
                <Modal.Body>
                    {props.content}
                </Modal.Body> 
                <Modal.Footer>
                    <Button>Submit</Button>
                    <Button>Close</Button>
                </Modal.Footer>
            </Modal>
    },[isOpen])

    return{
        setIsOpen,
        displayModal,
        isOpen
    }

}