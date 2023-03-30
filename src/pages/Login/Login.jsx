import React, { useState } from "react";
import { logIn } from "../../hooks/authService";

function Login({ config }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const payload = {
    username: "test",
    password: "test",
  };
  return (
    <>
      <div>Login section</div>
      {loading && <div>Loading ...</div>}
      {error && <div>an error occured !</div>}
      <button onClick={() => logIn(payload, config, setLoading, setError)}>login</button>
    </>
  );
}

export default Login;
