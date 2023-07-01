import { useState } from "react";
import styles from "./form.module.css";

export default function DisplayForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i;
    const regexPass = /^.{5,9}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!regexPass.test(values.password)) {
      errors.password =
        "Password should  be more than 4 and less than 10 characters";
    }
    return errors;
  };
  const isButtonDisabled = () => {
    return !formValues.username || !formValues.email || !formValues.password;
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate>
        <h1 className={styles.header}>Login Form</h1>
        <label className={styles.label}>Username</label>
        <input
          className={` ${
            formErrors.username ? styles.redBorder : styles.greenBorder
          }`}
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleChange}
        ></input>
        <br />
        <p>{formErrors.username}</p>
        <br />
        <label className={styles.label}>Email</label>
        <input
          className={` ${
            formErrors.email ? styles.redBorder : styles.greenBorder
          }`}
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        ></input>
        <br />
        <p className={styles.errorText}>{formErrors.email}</p>
        <br />
        <label className={styles.label}>Password</label>
        <input
          className={`${
            formErrors.password ? styles.redBorder : styles.greenBorder
          }`}
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        ></input>
        <br />
        <p className={styles.errorText}>{formErrors.password}</p>
        <br />
        <button
          className={`${isButtonDisabled() ? styles.disabledBtn : styles.btn}`}
          onChange={handleChange}
          disabled={isButtonDisabled()}
        >
          Submit
        </button>
      </form>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className={styles.successText}>Signed in successfully</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
