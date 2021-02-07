import React,{useCallback} from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.'
import { isOfflineForDatabase } from '../../context/ProfileContext'
import { useModuleState,useMediaQuery } from '../../misc/custom-hooks'
import { auth, database } from '../../misc/firebase'

const DashboardToggle = () => {
    const {isOpen,open,close} =useModuleState();
    const isMobile= useMediaQuery('(max-width:992px)');

    const onSignout=useCallback(() => {

        database.ref(`status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(()=> {
            auth.signOut();

            Alert.info('Signed Out',4000);

            close();
    
        }).catch(err=>{
            Alert.error(err.message,4000);
        })
            
        

            
        },
        [close],
    );
   
    return(
        <>
        <Button block color='blue' onClick={open}>
            <Icon icon='dashboard'/> Dashboard
        </Button>
        <Drawer full={isMobile} show={isOpen} onHide={close} placement='left'>
            <Dashboard onSignout={onSignout}/>
        </Drawer>   
        </>
    )
    }

export default DashboardToggle;
