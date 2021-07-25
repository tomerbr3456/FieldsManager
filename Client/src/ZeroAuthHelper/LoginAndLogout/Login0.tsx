import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button style={{color:'inherit',textTransform:'none',fontSize:'inherit',fontWeight:700}} onClick={() => loginWithRedirect()}>LogIn</Button>;
};

export default LoginButton;