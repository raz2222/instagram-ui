import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "./login.schema";
import { Link, useHistory } from "react-router-dom";
import config from "../config/index";

import "./Login.scss";
import { UserContext } from "../user-context";

function Login() {
  const [showError, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const submit = async (values) => {
    const res = await fetch(config.apiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (res.status === 200) {
      const loggedUser = await res.json();
      setUser(loggedUser);
      history.push("/");
    } else if (res.status === 401) {
      setError(true);
    } else {
      console.log("Unknown error");
    }
    return res;
  };

  return (
    <div className="Login d-flex row justify-content-center">
      <div className="col-lg-4 my-5 justify-content-center">
        <div className="shape justify-content-center">
          <span></span>
        </div>
        <div className="insta"></div>
      </div>
      <div className="col-lg-4 my-5">
        <h2 className="Login__title">Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form className="Login__form mt-5 col-lg-8 px-0" noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field className="form-control" id="username" name="username" />
                <ErrorMessage
                  component="small"
                  name="username"
                  className="Login__form__error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                />
                <ErrorMessage
                  component="small"
                  name="password"
                  className="Login__form__error"
                />
              </div>
              <div className="form-group text-right">
                <button
                  type="submit"
                  className="mt-3 Login__submit-btn"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
              <hr className="mt-4" />
              <div className="text-center">
                Don't have an account?{" "}
                <Link to="/register" className="Login__register-link">
                  Register
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
