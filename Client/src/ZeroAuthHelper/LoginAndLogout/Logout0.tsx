import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";


const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button style={{color:'inherit',textTransform:'none',fontSize:'inherit',fontWeight:700}} onClick={() => logout({ returnTo: window.location.origin })}>
      LogOut
    </Button>
  );
};

export default LogoutButton;