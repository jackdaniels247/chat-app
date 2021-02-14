import React from 'react'
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentroom } from '../../../context/CurrentRoom.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
 import PresenceDot from '../../PresenceDot';
import ProfileBtnModal from './ProfileBtnModal';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({message,handleAdmin,handleLike}) => {


    const {author, createdAt, text,likes,likeCount}=message;

    const [selfRef,isHovered]=useHover();

    const isAdmin= useCurrentroom(v=>v.isAdmin);
    const admins=useCurrentroom(v=>v.admins);

    const isMobile=useMediaQuery('(max-width:992px)');

    const isMsgAuthAdmin= admins.includes(author.uid);

    const isAuthor= auth.currentUser.uid===author.uid;

    const canGrantAdmin= isAdmin && !isAuthor;

    const isLiked=likes && Object.keys(likes).includes(auth.currentUser.uid);

    const canShowIcon=isMobile ||isHovered;

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

  <IconBtnControl  
  {...(isLiked?{color:'red'}:{})}
  isVisible={canShowIcon}
  iconName='heart'
  tooltip='Like this message'
  onClick={()=>handleLike(message.id)}
  badgeContent={likeCount}
  />

            </div>

            <div>
                <span className='word-break-all'>{text}</span>
            </div>
        </li>
    )
}

export default MessageItem
