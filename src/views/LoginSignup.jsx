import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, signup } from "../store/actions/user.actions";
import { useForm } from "../customHooks/useForm";
import { userService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    setLoginCred({ ...userService.getEmptyLoginCred() });
    setSignupCred({ ...userService.getEmptySignupCred() });
  }, [loggedinUser]);

  async function onLogin(ev) {
    ev.preventDefault();
    if (!loginCred.username || !loginCred.password) return;
    try {
      dispatch(login({ ...loginCred }));
      // navigate('/recipe')
    } catch (err) {
      console.error(err);
    }
  }

  async function onSignUp(ev) {
    ev.preventDefault();
    if (!signupCred.username || !signupCred.password || !signupCred.fullname)
      return;
    try {
      dispatch(signup({ ...signupCred }));
    } catch (err) {
      console.error(err);
    }
  }

  // async function onLogout() {
  //   try {
  //     dispatch(logout());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <section className="login-signup">
      <pre>{JSON.stringify(loginCred)}</pre>
      <h3>Log in:</h3>
      <form onSubmit={onLogin} className="form-style">
        <label htmlFor="username">User name:</label>
        <input
          value={loginCred.username}
          onChange={handleChangeLogin}
          type="text"
          name="username"
          id="usernameLogin"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={loginCred.password}
          onChange={handleChangeLogin}
          type="password"
          name="password"
          id="passwordLogin"
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
          id="fullnameSignup"
        />
        <label htmlFor="username">User name:</label>
        <input
          value={signupCred.username}
          onChange={handleChangeSignup}
          type="text"
          name="username"
          id="usernameSignup"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={signupCred.password}
          onChange={handleChangeSignup}
          type="password"
          name="password"
          id="passwordSignup"
        />
        <button>Sign up</button>
      </form>
    </section>
  );
}
