import React from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button variant="secondary" size="lg" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;
