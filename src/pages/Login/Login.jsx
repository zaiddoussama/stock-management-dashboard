import React from "react";
import { logIn } from "../../hooks/authService";

function Login({config}) {
    const payload = {
        username: 'test',
        password: 'test'
    }
  return (
    <>
      <div>Login section</div>
      <button onClick={() => logIn(payload, config)}>login</button>
    </>
  );
}

export default Login;
