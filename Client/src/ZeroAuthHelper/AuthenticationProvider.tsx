import React, { ReactNode } from 'react';
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthenticationProvider = (props: { children: ReactNode }) => {
  return (
    <Auth0Provider
      domain="dev-wy795gaz.us.auth0.com"
      clientId="ndL2Yj2ESAew9AvXVHRYae9UgeiD5fHz"
      redirectUri={window.location.origin}
    >
      {props.children}
    </Auth0Provider>

  )
}

