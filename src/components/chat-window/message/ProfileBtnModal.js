import React from 'react'
import { Button, Modal } from 'rsuite';
import {useModuleState} from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileBtnModal = ({profile,...btnProps}) => {

    const {isOpen,close,open} = useModuleState();

    const {name, avatar, createdAt} = profile

const shortName=name.split(' ')[0];

const memberSince= new Date(createdAt).toLocaleDateString();

    return (
        <div>
           <Button {...btnProps} onClick={open}>
               {shortName}
           </Button>

           <Modal show={isOpen} onHide={close} >
               <Modal.Header>
                   <Modal.Title>
                       {shortName} profile
                   </Modal.Title>
               </Modal.Header>
               <Modal.Body className='text-center'>

                   <ProfileAvatar src={avatar} name={name} className='width-200 height-200 img-fullsize font-huge'/>

                   <h4 className='mt-2'>{name} </h4>

                   <p>Member Since {memberSince}</p>
                 
               </Modal.Body>
               <Modal.Footer>
                   <Button block onClick={close} >close</Button>
               </Modal.Footer>
           </Modal>


        </div>
    )
}

export default ProfileBtnModal