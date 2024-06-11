import { useState } from 'react';
import { Container, FormWrapper, Title, Input, Button, Link } from './FormStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({name: '', email: '', password: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
          const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };
          const response = await axios.post(
            "http://localhost:4000/signup",
            payload
          );
    
          if (response.status == 201) {
            const message = response?.data.message || "User Created ";
            // alert(message);
            localStorage.setItem('user', JSON.stringify(response.data.user));
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
        
      };

    // navigate('/login');
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
        <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          
          <Button type="submit">Sign Up</Button>
        </form>
        <Link onClick={() => navigate('/login')}>Already have an account? Login</Link>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
