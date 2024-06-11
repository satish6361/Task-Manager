import { useState } from 'react';
import { Container, FormWrapper, Title, Input, Button, Link } from './FormStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ColoredContainer = styled(Container)`
  background-color: #f0f8ff; /* Light blue */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ColoredFormWrapper = styled(FormWrapper)`
  background-color: #ffffff; /* White */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 300px;
  border-radius: 10px;
  text-align: center;
`;

const ColoredTitle = styled(Title)`
  margin-bottom: 20px;
`;

const ColoredInput = styled(Input)`
  width: 90%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
`;

const ColoredButton = styled(Button)`
  background-color: #4682b4; /* Steel blue */
  color: #fff;
  width: 100%;
  border-radius: 5px;
  margin-top: 20px;
`;

const ColoredLink = styled(Link)`
  color: #4682b4; /* Steel blue */
  margin-top: 10px;
  text-decoration: none;
`;

const ErrorMessage = styled.div`
  color: #ff6347; /* Tomato */
  margin-top: 10px;
`;

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
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
      const response = await axios.post("https://satish-task-manager.onrender.com/signup", payload);

      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || "Unknown error";
        setError(message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <ColoredContainer>
      <ColoredFormWrapper>
        <ColoredTitle>Sign Up</ColoredTitle>
        <form onSubmit={handleSubmit}>
          <ColoredInput
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <ColoredInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <ColoredInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ColoredButton type="submit">Sign Up</ColoredButton>
        </form>
        <ColoredLink onClick={() => navigate('/login')}>Already have an account? Login</ColoredLink>
      </ColoredFormWrapper>
    </ColoredContainer>
  );
};

export default Signup;
