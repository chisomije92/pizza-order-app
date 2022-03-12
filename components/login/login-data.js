import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./login-data.module.css";

const LoginData = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const loginDetails = {
        username: username,
        password: password,
      };

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        credentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <section className={classes.container}>
      <div>
        <h1>Admin Dashboard</h1>
        <form
          className={classes.wrapper}
          onSubmit={(evt) => evt.preventDefault()}
        >
          <input
            placeholder="username"
            className={classes.input}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="true"
          />
          <input
            placeholder="password"
            type="password"
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="true"
          />
          <button className={classes.button} onClick={handleClick}>
            Sign In
          </button>
          {error && <span className={classes.error}>Wrong Credentials!</span>}
        </form>
      </div>
    </section>
  );
};

export default LoginData;
