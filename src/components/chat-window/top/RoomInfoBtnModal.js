import React from 'react'
import { Button, Modal } from 'rsuite';
import { useCurrentroom } from '../../../context/CurrentRoom.context'
import { useModuleState } from '../../../misc/custom-hooks';

const RoomInfoBtnModal = () => {

    const description = useCurrentroom(v=>v.description);
    const name =useCurrentroom(v=>v.name);
    const {isOpen,open,close} =useModuleState();
    return (
        <div>
            <Button appearance='link' className='px-0' onClick={open} >
                Room Information
            </Button>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        About {name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6 className='mb-1'>Description</h6>
                <p>{description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RoomInfoBtnModal