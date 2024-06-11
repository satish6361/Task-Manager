import React, { useState } from 'react';
import { Container, FormWrapper, Title, Input, Button, Link } from './FormStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
        const payload = {
          email: formData.email,
          password: formData.password,
        };
        const response = await axios.post("http://localhost:4000/login", payload);
  
        if (response.status == 200) {
        //   localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
  
        if (response.status == 200) {
          navigate("/");
        }
  
        console.log("response", response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message || "Unknown error";
          alert(message);
          console.log("Error", message);
        } else {
          console.log("Unexpected error", error);
        }
      }

    navigate('/');
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Login</Button>
        </form>
        <Link onClick={() => navigate('/signup')}>Don't have an account? Sign Up</Link>
      </FormWrapper>
    </Container>
  );
};

export default Login;
