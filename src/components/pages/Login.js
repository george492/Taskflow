import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import { motion } from "framer-motion";
import "../Profile.css";
import CUser from "../../UserRecoil";
import User_Token from "../Tokaerecoil";
import { useRecoilState } from "recoil";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Too Short!").required("Required"),
});

export default function Login() {
  const [user, setUser] = useRecoilState(CUser);
  const [token, setToken] = useRecoilState(User_Token);
  const [errorlogin, setErrorlogin] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      const { token, ...userData } = res.data;
      setToken(token);
      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (err) {
      setErrorlogin(true);
      setCount(prev => prev + 1);
      setTimeout(() => {
        setErrorlogin(false);
      }, 3000);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (count >= 3) {
      setErrorlogin(false);
      setCount(0);
      navigate("/register");
    }
  }, [count, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="pape-container">
        <div className="profile-box">
          <h2>Welcome Back!</h2>
          <p>Please enter your data to log in</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="profile-info">
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="profile-input"
                />
                {errors.email && touched.email && (
                  <div className="input-error">{errors.email}</div>
                )}

                <Field name="password">
                  {({ field }) => (
                    <PasswordInput
                      {...field}
                      placeholder="Password"
                    />
                  )}
                </Field>
                {errors.password && touched.password && (
                  <div className="input-error">{errors.password}</div>
                )}

                <button type="submit" className="profile-btn" disabled={isSubmitting}>
                  Login
                </button>

                <p>Don't have an account yet? <Link to="/register">Register</Link></p>
              </Form>
            )}
          </Formik>

          <div className={errorlogin ? "error-login" : "error-login-hidden"}>
            <Alert severity="error">Invalid email or password</Alert>
          </div>
        </div>
      </div>
    </motion.div>
  );
}