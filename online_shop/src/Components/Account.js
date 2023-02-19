import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType1, setPasswordType1] = useState("password");

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const togglePassword1 = () => {
    if (passwordType1 === "password") {
      setPasswordType1("text");
      return;
    }
    setPasswordType1("password");
  };
  const navigate = useNavigate();
  let registerUserData = localStorage.getItem("userList");
  registerUserData = registerUserData ? JSON.parse(registerUserData) : [];
  var LoginForm = document.getElementById("LoginForm");
  var RegForm = document.getElementById("RegForm");
  var Indicator = document.getElementById("Indicator");

  function register() {
    setIsLogin(false);
    setInput({});
    setErrors({});
    RegForm.style.transform = "translateX(0px)";
    LoginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(100px)";
  }

  function login() {
    setIsLogin(true);
    setErrors({});
    setInput({});
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const validateFrom = () => {
    let error = {};
    const min = 3,
      max = 25;
    const isBetween = (length, min, max) =>
      length < min || length > max ? false : true;
    const isPasswordSecure = (password) => {
      const re = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      return re.test(password);
    };
    const isEmailValid = (email) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
    if (!input?.password) {
      error["password"] = "Password cannot be blank.";
    } else if (!isPasswordSecure(input?.password)) {
      error["password"] =
        "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)";
    }
    if (!input?.email) {
      error["email"] = "Email cannot be blank.";
    } else if (!isEmailValid(input?.email)) {
      error["email"] = "Email is not valid.";
    }
    if (!isLogin) {
      if (!input?.username) {
        error["username"] = "Username cannot be blank.";
      } else if (!isBetween(input?.username?.length, min, max)) {
        error[
          "username"
        ] = `Username must be between ${min} and ${max} characters.`;
      }
      if (!input?.confirmPassword) {
        error["confirmPassword"] = "Please enter the password again.";
      } else if (input?.password !== input?.confirmPassword) {
        error["confirmPassword"] = "confirmPassword is not valid.";
      }
    }
    if (Object.keys(error)?.length) {
      setErrors(error);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (validateFrom()) {
      let findIndex = registerUserData?.findIndex(
        (e) => e?.email === input?.email && e?.password === input?.password
      );
      if (findIndex !== -1) {
        localStorage.setItem(
          "userData",
          JSON.stringify(registerUserData[findIndex])
        );
        toast.success("Login Successfully.");
        navigate("/");
      } else {
        toast.error("Invalid email or password.");
      }
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validateFrom()) {
      let filterData = registerUserData?.filter(
        (e) => e?.email === input?.email
      );
      if (filterData?.length > 0) {
        toast.error("This email alrady exit.");
        return;
      }
      const body = {
        id: +new Date(),
        ...input,
      };
      registerUserData.push(body);
      localStorage.setItem("userList", JSON.stringify(registerUserData));
      localStorage.setItem("userData", JSON.stringify(body));
      toast.success(isLogin ? "Login Successfully." : "Register Successfully.");
      navigate("/");
    }
  };
  return (
    <React.Fragment>
      <main>
        <section className="account-page">
          <div className="container">
            <div className="row">
              <div className="col-2">
                <img
                  src={require("../Assets/img/online-vectore.png")}
                  width="100%"
                />
              </div>
              <div className="col-2">
                <div className="form-container">
                  <div className="form-btn">
                    <span onClick={login}>Login</span>
                    <span onClick={register}>Register</span>
                    <hr id="Indicator" />
                  </div>
                  <div>
                    <form id="LoginForm">
                      <div
                        className={
                          errors["email"] ? "error form-field" : "form-field"
                        }
                      >
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          id="email"
                          className={errors["email"] ? "error" : ""}
                          autoComplete="off"
                          value={input?.email}
                          onChange={(e) => handleChange(e)}
                        />
                        <small className="small">{errors["email"]}</small>
                      </div>
                      <div
                        className={
                          errors["password"]
                            ? "error form-field input-relative"
                            : "input-relative form-field"
                        }
                      >
                        <input
                          type={passwordType}
                          placeholder="Password"
                          className={errors["password"] ? "error" : ""}
                          name="password"
                          onChange={(e) => handleChange(e)}
                          id="password1"
                          autoComplete="off"
                          value={input?.password}
                        />
                        <div
                          className="position-icons"
                          onClick={togglePassword}
                        >
                          {passwordType !== "text" ? (
                            <i className="fa fa-eye-slash" />
                          ) : (
                            <i className="fa fa-eye" />
                          )}
                        </div>
                        <small className="small">{errors["password"]}</small>
                      </div>
                      <button
                        type="submit"
                        className="btn"
                        onClick={(event) => onLogin(event)}
                      >
                        Login
                      </button>
                      <a href="">Forgot Password</a>
                    </form>

                    <form id="RegForm">
                      <div
                        className={
                          errors["username"] ? "error form-field" : "form-field"
                        }
                      >
                        <input
                          type="text"
                          placeholder="Username"
                          name="username"
                          className={errors["username"] ? "error" : ""}
                          id="username"
                          autoComplete="off"
                          value={input?.username}
                          onChange={(e) => handleChange(e)}
                        />
                        <small className="small">{errors["username"]}</small>
                      </div>
                      <div
                        className={
                          errors["email"] ? "error form-field" : "form-field"
                        }
                      >
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          id="email"
                          className={errors["email"] ? "error" : ""}
                          autoComplete="off"
                          value={input?.email}
                          onChange={(e) => handleChange(e)}
                        />
                        <small className="small">{errors["email"]}</small>
                      </div>
                      <div
                        className={
                          errors["password"]
                            ? "error form-field input-relative"
                            : "input-relative form-field"
                        }
                      >
                        <input
                          type={passwordType}
                          placeholder="Password"
                          name="password"
                          className={errors["password"] ? "error" : ""}
                          value={input?.password}
                          onChange={(e) => handleChange(e)}
                          id="password"
                          autoComplete="off"
                        />
                        <div
                          className="position-icons"
                          onClick={togglePassword}
                        >
                          {passwordType !== "text" ? (
                            <i className="fa fa-eye-slash" />
                          ) : (
                            <i className="fa fa-eye" />
                          )}
                        </div>
                        <small className="small">{errors["password"]}</small>
                      </div>
                      <div
                        className={
                          errors["confirmPassword"]
                            ? "error form-field input-relative"
                            : "form-field input-relative"
                        }
                      >
                        <input
                          type={passwordType1}
                          placeholder="Confirm-password"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={input?.confirmPassword}
                          onChange={(e) => handleChange(e)}
                          autoComplete="off"
                        />
                        <div
                          className="position-icons"
                          onClick={togglePassword1}
                        >
                          {passwordType1 !== "text" ? (
                            <i className="fa fa-eye-slash" />
                          ) : (
                            <i className="fa fa-eye" />
                          )}
                        </div>
                        <small className="small">
                          {errors["confirmPassword"]}{" "}
                        </small>
                      </div>

                      <button
                        type="submit"
                        className="btn"
                        onClick={(event) => onSubmit(event)}
                      >
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
