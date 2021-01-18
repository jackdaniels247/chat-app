import React,{useState} from 'react'
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModuleState } from '../../misc/custom-hooks';

const AvatarUploadBtn = () => {
    const {isOpen, open, close}= useModuleState();

    const [img,setImg]=useState(null);
    const fileInputTypes=".png, .jpeg, .jpg";

    const acceptedFiles=['image/png','image/jpeg','image/pjpeg'];
    const isValidFiles=(file)=>acceptedFiles.includes(file.type);
    const onFileInputChange=(ev)=>{
    const currFiles=ev.target.files;
    if(currFiles.length===1){
    const file=currFiles[0];
    if(isValidFiles(file)){

        setImg(file);
        open();
    }else{
        Alert.warning(`Wrong file type ${file.type}`);
    }
    }
    }
   
    return(
        <div className='mt-3 text-center'>
            <div>
                <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
                    Select new Avatar
                    <input id='avatar-upload' type='file' className='d-none' accept={fileInputTypes} onChange={onFileInputChange} />
                </label>

                <Modal show={isOpen} onHide={close}> 
                    <Modal.Header>
                        <Modal.Title>
                        Adjust and upload new avatar
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center align-items-center h-100'>

                    {img &&
                     <AvatarEditor
                     image={img}
                     width={200}
                     height={200}
                     border={10}
                     borderRadius={100}
                     
                     rotate={0}
                     />
                    }
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance='ghost'>
                            Upload new Avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        </div>
    )
}


export default AvatarUploadBtn
