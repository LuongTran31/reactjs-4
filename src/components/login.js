import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
const initialValues = { email: '', password: '' };
const validateValues = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  } else if (values.password.length < 8) {
    errors.password = 'At least 8 characters';
  }
  return errors;
};

const linkStyle = {
  textDecoration: "none",
};


const Login = ({currentUser, setCurrentUser, title }) => {
  //const history = useHistory();
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    setAgree(!agree);
  }

  const onSubmit = (values, { setSubmitting }) => {
    console.log('values = ', values);

    axios.get('https://60dff0ba6b689e001788c858.mockapi.io/token', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      setCurrentUser({
        token: response.data.token,
        userId: response.data.userId,
      })
      axios.defaults.headers.common["Authorization"] = response.data.token;
    })
    console.log(currentUser);

    // history.push('/profile');
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400)
  }
  const mystyle = {
    width: "100px",
    height: "100px",
    position: "absolute",
    left: "50%",
    marginLeft: "-50px",
};


  return (
    <div className="login-form">
      {title && <h5>{title}</h5>}
      <Formik
        initialValues={initialValues}
        validate={validateValues}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,

        }) => (
          <div style={mystyle}>
            {title && <h5>{title}</h5>}
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type="submit">Login</Button>

              
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Login;