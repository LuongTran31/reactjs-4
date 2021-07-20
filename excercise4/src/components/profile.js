
import React , {useState} from "react";

import { Form, Button, Row, Col } from 'react-bootstrap';

const Profile = () =>{
  const mystyle = {
    width: "100px",
    height: "100px",
    position: "absolute",
    left: "50%",
    marginLeft: "-50px",
};

const [values, setValues] = useState({
        email: '',
        userName: '',
        password: '',
        rePassword: '',
        
        });

    const [touched, setTouched] = useState(
        {
            email : false,
            userName: false,
            password: false,
            rePassword: false,

        }
    );
    
    
    const validateEmail = email =>{
        if(!email) return 'Email is require';
        return '';
    }
    const validatePassword = password =>{
        if(!password) return 'Password is require';
        if(password.length < 8 ) return 'At least 8 character';
        return '';
    }
    const validateUsername = userName =>{
        if(!userName) return 'Username is require';
        return '';
    }
    const validateRepass= rePassword => {
        if (values.password != rePassword) return 'Password is not matching';
        return '';
    }
    const handleOnChange = evt => {
        setValues({
        ...values,
        [evt.target.name]: evt.target.value
        });
    }
    const handleOnSubmit = evt =>{
        evt.preventDefault();
        console.log(values);
    }
    const handleOnblur = evt =>{
        setTouched({
            ...touched,[evt.target.name]: true
        })
    };
    const emailError = validateEmail(values.email);
    const passwordError =validatePassword(values.password);
    const userNameError = validateUsername(values.userName);
    const repasswordError = validateRepass(values.rePassword);
    return (
        <Form onSubmit= {handleOnSubmit} style={mystyle}> 
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            UserName
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" 
            placeholder="Username" 
            onChange={ handleOnChange } 
            value= {values.userName} 
            onBlur ={handleOnblur} 
            name= "userName"/> 
           { touched.userName && <span style= {{color: "red"}}>{userNameError}</span>}
          </Col>
         
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10} >
            <input type="email" placeholder="Email"
             onChange={ handleOnChange } 
              onBlur ={handleOnblur} 
              value = {values.email} 
              name = "email" />
            {touched.email && <span style= {{color: "red"}}>{emailError}</span>}
          </Col>
          
        </Form.Group>
      
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label  >
          <Col sm={10}>
            <input type="password" placeholder="Password"
             onChange={ handleOnChange }  onBlur ={handleOnblur}
              value = {values.password} 
               name = "password"  />
            {touched.password && <span style= {{color: "red"}}>{passwordError}</span> }
          </Col>
          
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
           Retype Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Retype password" 
            onChange={ handleOnChange }
              onBlur ={handleOnblur} 
              value= {values.rePassword} 
              name="rePassword" />
           {touched.rePassword &&  <span style= {{color: "red"}}>{repasswordError}</span> }
          </Col>
        </Form.Group>
        
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Male"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Female"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>
        
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="I have read the agreement" checked = "true" />
           
          </Col>
        </Form.Group>
      
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit"  disabled={!values.email || !values.password 
            || !values.userName || !values.rePassword } >Register</Button>
          </Col>
        </Form.Group>
      </Form>
    );
};
export default Profile;

