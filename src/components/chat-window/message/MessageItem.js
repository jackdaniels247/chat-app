import React from 'react'
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentroom } from '../../../context/CurrentRoom.context';
import { useHover } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
 import PresenceDot from '../../PresenceDot';
import ProfileBtnModal from './ProfileBtnModal';

const MessageItem = ({message,handleAdmin}) => {


    const {author, createdAt, text}=message;

    const [selfRef,isHovered]=useHover();

    const isAdmin= useCurrentroom(v=>v.isAdmin);
    const admins=useCurrentroom(v=>v.admins);

    const isMsgAuthAdmin= admins.includes(author.uid);

    const isAuthor= auth.currentUser.uid===author.uid;

    const canGrantAdmin= isAdmin && !isAuthor;

    return (
        <li className={`padded mb-1 cursor-pointer ${isHovered?'bg-black-02':''} `} ref={selfRef} >
            
            <div className='d-flex align-items-center font-bolder mb-1'>

                <PresenceDot  uid={author.uid} />
            <ProfileAvatar src={author.avatar} name={author.name} className='ml-1' size='xs' />

           
            <ProfileBtnModal profile={author} appearance='link' className='p-0 ml-1 text-black'>
{canGrantAdmin &&
<Button onClick={()=>handleAdmin(author.uid)} color='blue' block>
{isMsgAuthAdmin ? 'Remove Admin' :'Make Admin'}
</Button>
}
                </ProfileBtnModal>

            <TimeAgo className='font-normal text-black-45 ml-2'
  datetime={createdAt}/>

            </div>

            <div>
                <span className='word-break-all'>{text}</span>
            </div>
        </li>
    )
}

export default MessageItem
