import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, signup } from "../store/actions/user.actions";
import { useForm } from "../customHooks/useForm";
import { userService } from "../services/user.service";

export function LoginSignup() {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  );
  const dispatch = useDispatch();

  const [loginCred, handleChangeLogin, setLoginCred] = useForm(
    userService.getEmptyLoginCred()
  );
  const [signupCred, handleChangeSignup, setSignupCred] = useForm(
    userService.getEmptySignupCred()
  );

  useEffect(() => {}, [loggedinUser]);

  async function onLogin() {
    if (!loginCred.username || !loginCred.password) return;
    try {
      dispatch(login({ ...loginCred }));
    } catch (err) {
      console.error(err);
    }
  }

  async function onSignUp() {
    if (!signupCred.username || !signupCred.password || !signupCred.fullname)
      return;
    try {
      dispatch(signup({ ...signupCred }));
    } catch (err) {
      console.error(err);
    }
  }

  async function onLogout(){
    try {
        dispatch(logout());
      } catch (err) {
        console.error(err);
      }
  }

  return loggedinUser ? (
    <section className="login-signup">
      <h2>{JSON.stringify(loggedinUser, null, 2)}</h2>
      <button onClick={onLogout}>Log Out</button>
    </section>
  ) : (
    <section className="login-signup">

      <h3>Log in:</h3>
      <form onSubmit={onLogin} className="form-style">
        <label htmlFor="username">User name:</label>
        <input
          value={loginCred.username}
          onChange={handleChangeLogin}
          type="text"
          name="username"
          id="username"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={loginCred.password}
          onChange={handleChangeLogin}
          type="text"
          name="password"
          id="password"
        />
        <button>Log in</button>
      </form>

      <h3>Sign up:</h3>
      <form onSubmit={onSignUp} className="form-style">
        <label htmlFor="fullname">Full name:</label>
        <input
          value={signupCred.fullName}
          onChange={handleChangeSignup}
          type="text"
          name="fullname"
          id="fullname"
        />
        <label htmlFor="username">User name:</label>
        <input
          value={signupCred.username}
          onChange={handleChangeSignup}
          type="text"
          name="username"
          id="username"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={signupCred.password}
          onChange={handleChangeSignup}
          type="text"
          name="password"
          id="password"
        />
        <button>Sign up</button>
      </form>
    </section>
  );
}
