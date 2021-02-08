// import { format } from 'prettier';
import React,{memo} from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite'
// import { useContextUpdate } from 'use-context-selector';
import { useCurrentroom } from '../../../context/CurrentRoom.context';
import { useMediaQuery, useModuleState } from '../../../misc/custom-hooks'
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';


const EditRoomDrawer = () => {

const {isOpen,close,open}=useModuleState();

const {chatId}=useParams();

const isMobile= useMediaQuery('(max-width:992px)');

const name= useCurrentroom(v=>v.name);
const description=useCurrentroom(v=>v.description);

const update=(key,value)=>{
    database.ref(`/rooms/${chatId}`).child(key).set(value).then(()=>{
        Alert.success('Successfully Updated',4000);
    }).catch(err=>{
        Alert.error(err.message,4000);
    })
}

const onNameSave=(newName)=>{
update('name',newName);
}
const onDescSave=(newDesc)=>{
update('description',newDesc);
}

    return (
        <div>
            <Button className='br-circle' size='sm' color='red' onClick={open}>
                A
            </Button>

            <Drawer full={isMobile} show={isOpen} onHide={close} placement='right'>
                <Drawer.Header>
                    <Drawer.Title>
                        Edit Room
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                <EditableInput
                initialValue={name}
                label={<h6 className='mb-2'>Name</h6>}
                emptyMsg='Name cannot be empty'
                onSave={onNameSave}
                />
                <EditableInput
                componentClass='textarea'
                rows={5}
                initialValue={description}
                emptyMsg='description cannot be empty'
                wrapperClassName='mt-3'
                onSave={onDescSave}
                />
                </Drawer.Body>
                <Drawer.Footer>
                    <Button block onClick={close} >
                        close
                    </Button>
                </Drawer.Footer>

            </Drawer>
        </div>
    )
}

export default memo(EditRoomDrawer);
