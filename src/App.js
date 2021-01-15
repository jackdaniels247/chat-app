import React from 'react';

import 'rsuite/dist/styles/rsuite-default.css';
import { Switch} from 'react-router';
import './styles/main.scss';
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRouter from './components/PublicRouter';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <ProfileProvider>
 <Switch>
    <PublicRouter path='/signin'>
      <Signin/>
    </PublicRouter>
    <PrivateRoute path='/'>
      <Home />
    </PrivateRoute>
    </Switch>
    </ProfileProvider>
   
    
  );
}

export default App;
