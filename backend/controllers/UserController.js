const User = require('../models/userModel');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const SECRET_KEY = '4AF5B596-477E-45EF-BCA6-D7F1D44A22C6'; 

exports.registerUser = async (req, res, next) => {
    if (!req.body.email || !req.body.password  || !req.body.name ) {
      return res.status(400).json({ message: "Enter valid credentials" });
    }
    const { email, password ,name} = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password:hashedPassword,
        name,
      });
  
      return res
          .status(201)
          .json({ message: "User created successfully" ,user});
  
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Error registering user" });
    }
  };
  
  exports.loginUser = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(401).json({ message: "Enter valid email & password" });
    }
  
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });


      if (!user ) {
        return res.status(404).json({ message: "Invalid Email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
  
    // const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '5h' });

  
      return res.status(200).json({ message: "Login successful", user });

    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Error during login" });
    }
  };

//   exports.verifyToken = async (req, res) => {
//     const token = req.headers['authorization'];
  
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }
  
//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//       res.status(200).json({ message: 'Token is valid' });
// });
// };