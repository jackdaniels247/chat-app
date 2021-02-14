import React, { Children } from 'react'
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite'

const ConditionBadge= ({condition,children})=>(
condition ? <Badge content={condition} >{Children}</Badge> : children
)


const IconBtnControl = ( {isVisible, iconName, tooltip,onClick, badgeContent, ...props }) => 
    
         (
        <div className='ml-2'  style={{visibility:isVisible?'visible':'hidden'}} >

        <ConditionBadge condition={badgeContent}>
        <Whisper
        placement='top'
        delay={0}
        delayHide={0}
        delayShow={0}
        trigger='hover'
        speaker={<Tooltip>{tooltip}</Tooltip>}
        >


        <IconButton  
        {...props}
        onClick={onClick}
        circle
        size='xs'
        icon={<Icon icon={iconName} />}
        />

        
        </Whisper>
        </ConditionBadge>
            
        </div>
        )
    
    


export default IconBtnControl
