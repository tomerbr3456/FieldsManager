import React from 'react';
import NewFieldForm from './AddField/NewFieldForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FieldsProvider } from '../StateManagement/FieldsContext';
import { ReservedFieldsProvider } from '../StateManagement/ReservedFieldsContext';
import Autentication from './FieldsView/Autentication';
import { useAuth0 } from "@auth0/auth0-react";



const AppRouter = () => {
  const { loginWithRedirect, } = useAuth0()
  return (
    <Router>
      <Switch>
        <FieldsProvider>
          <ReservedFieldsProvider>
            <Route path="/Login" exact component={() => {
              loginWithRedirect()
              return null;
            }} />
            <Route path="/" exact component={Autentication} />
            <Route path="/NewFieldForm" exact component={NewFieldForm} />
          </ReservedFieldsProvider>
        </FieldsProvider>
      </Switch>
    </Router >
  )
}
export default AppRouter
