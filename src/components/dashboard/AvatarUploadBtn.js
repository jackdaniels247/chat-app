import React,{useRef, useState} from 'react'
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModuleState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/ProfileContext';
import ProfileAvatar from './ProfileAvatar';

const AvatarUploadBtn = () => {
    const {isOpen, open, close}= useModuleState();
    const {profile}=useProfile();
    const[isLoading,setIsLoading]=useState(false);

    const [img,setImg]=useState(null);
    const avatarEditorRef=useRef();

    const getBlob=(canvas)=>
        new Promise((resolve,reject)=>{
            canvas.toBlob(blob=>{
                if(blob){
                    resolve(blob);
                }
                else{
                    reject(new Error ('File process error'));
                }
            })
        })
    

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

    const onUploadClick=async ()=>{
        const canvas=avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true);

        try{
  
            const blob=await getBlob(canvas);
            const avatarFileRef=storage.ref(`/profiles/${profile.uid}`).child('avatar');
            const uploadAvatarResult=await avatarFileRef.put(blob,{
                cacheControl:`public,max-age=${3600*24*3}`
            })
            const downloadUrl= await uploadAvatarResult.ref.getDownloadURL();
            const userAvatarRef=database.ref(`/profiles/${profile.uid}`).child('avatar');
            userAvatarRef.set(downloadUrl);

            Alert.info('Avatar has been uploaded',4000);
            setIsLoading(false);

        }catch(err){

            Alert.error(err.message,4000);
            setIsLoading(false);
        }


    }
   
    return(
        <div className='mt-3 text-center'>
            <div>
                
                <ProfileAvatar src={profile.avatar} name={profile.name} className='width-200 height-200 img-fullsize font-huge'/>
            
                
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
                     ref={avatarEditorRef}
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
                        <Button block appearance='ghost' onClick={onUploadClick} disabled={isLoading}>
                            Upload new Avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        </div>
    )
}


export default AvatarUploadBtn
