
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import FieldsContainer from './FieldsContainer';

export default function Autentication() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0()
  if (!isLoading)
    if (!isAuthenticated)
      loginWithRedirect()
  return (
    <>
      { isAuthenticated && (
        <FieldsContainer />
      )}

    </>
  )
}
