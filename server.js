const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Connexion à MongoDB local
mongoose.connect('mongodb://localhost:27017/health_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

const users = []; 

// Sign Up
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'user already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'user added', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign In 
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
   
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
     
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        message: 'Login successful',
        token: token,
      });
    });
  
  // Log Out 
  app.post('/api//logout', (req, res) => {
   
    res.status(200).json({ message: 'Logged out successfully' });
  });
  
 
  const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied, token missing!' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token!' });
      }
  
      req.user = decoded;  
      next();
    });
  };
  
  // JWT valid 
  app.get('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'You are authorized', user: req.user });
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
