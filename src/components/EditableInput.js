import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

const EditableInput = ({initialValue,onSave,name,label=null,placeholder='Write your value',emptymsg='Input is Empty',wrapperClassName='',...initalProps}) => {

    const[input,setInput]=useState(initialValue);
    const[isEditable,setIsEditable]=useState(false);

    const onInputChange=useCallback((value)=>{
        setInput(value);
    },[])
    const onEditclick=useCallback(()=>{
        setIsEditable(p=>!p);
        setInput(initialValue);
    },[initialValue])
    const onSaveclick=async ()=>{
    const trimmed=input.trim();
    if(trimmed===''){
        Alert.info(emptymsg,4000);
    }
    if(trimmed!==initialValue){
    await onSave(trimmed);
    }
    setIsEditable(false);
    }
    return (
        <div className={wrapperClassName}>
            {label}
            <InputGroup>
            <Input
            {...initalProps}
            disabled={!isEditable}
            placeholder={placeholder}
            emptymsg={emptymsg}
            value={input}
            onChange={onInputChange}
            />
            <InputGroup.Button onClick={onEditclick}>
            <Icon icon={isEditable?'close':'edit2'}/>
            </InputGroup.Button>
            {isEditable &&
            <InputGroup.Button onClick={onSaveclick}> 
            <Icon icon='check'/>
            </InputGroup.Button>
            }
            </InputGroup>
        </div>
    )
}

export default EditableInput
