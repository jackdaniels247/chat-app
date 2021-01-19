import React from 'react'
import TimeAgo from 'timeago-react';

const RoomItem = () => 
    (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
            <h3 className='text-disappear'>Room Name</h3>
            
            <TimeAgo className='font-normal text-black-45'
  datetime={new Date()}/>
            </div>

            <div className='d-flex align-items-center text-black-70'>
                <span>No messages yet...</span>
            </div>
        </div>
    )


export default RoomItem
