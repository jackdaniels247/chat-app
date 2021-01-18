import React from 'react'
import { Avatar } from 'rsuite'
import {getNameInitials} from '../../misc/helper';

const ProfileAvatar = ({name,...AvatarProps}) => 
    (
        <div>
          <Avatar
          circle {...AvatarProps}
          >
              {getNameInitials(name)}
          </Avatar>
        </div>
    )


export default ProfileAvatar
