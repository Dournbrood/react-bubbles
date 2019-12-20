import React, { useState } from "react";
import { axiosWithAuth } from "../Utils/axiosWithAuth";

const Login = (props) => {

  const [loginState, setLoginState] = useState(
    {
      credentials: {
        username: "",
        password: "",
      },
      busy: false,
    }
  );

  const handleChanges = (event) => {
    setLoginState({
      credentials: {
        ...loginState.credentials,
        [event.target.name]: event.target.value,
      },
    });
  }

  const login = (event) => {
    event.preventDefault();
    setLoginState({
      ...loginState,
      busy: true,
    });
    axiosWithAuth()
      .post("/login", loginState.credentials)
      .then((response) => {
        console.log("API LOGIN RESPONSE IS", response);
        localStorage.setItem("token", response.data.payload);
        setLoginState({
          credentials: {
            username: "",
            password: "",
          },
          busy: false,
        });
        props.history.push("/protected");

      })
      .catch((error) => {
        console.log("POST ERROR: ", error);
        setLoginState({
          credentials: {
            username: "",
            password: "",
          },
          busy: false,
        });
      });
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginState.credentials.username}
          onChange={handleChanges}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginState.credentials.password}
          onChange={handleChanges}
        />
        <button>{loginState.busy ? "Logging In" : "Log In"}</button>
      </form>
    </div>
  );
};

export default Login;
