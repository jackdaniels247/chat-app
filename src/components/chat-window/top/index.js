import React,{memo} from 'react'
import { useCurrentroom } from '../../../context/CurrentRoom.context'

const   Top = () => {
    const name= useCurrentroom(v => v.name);
    return(
        <div>
            {name}
        </div>
    )
    }

export default memo(Top);
