import { useState, useEffect } from "react";

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
    console.log(formValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password should  be more than 4  characters";
    } else if (values.password.length > 10) {
      errors.password = "Password must be less than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="message-success">Sign in successfully</div>
      ) : (
        <div>Couldn't sign in</div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <h1>Login Form</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleChange}
        ></input>
        <br />
        <p>{formErrors.username}</p>
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        ></input>
        <br />
        <p>{formErrors.email}</p>
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        ></input>
        <br />
        <p>{formErrors.password}</p>
        <br />
        <button className="btn" onChange={handleChange}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}
