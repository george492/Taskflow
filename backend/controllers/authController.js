const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PEPPER = 'your-secret-pepper'; 
// Generate token
const token = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
console.log("Generated JWT Token:");
console.log(token);

const register = async (req, res) => {
    try {
        const { name, email, password, profileImage, rating, numOfRatings } = req.body;
        console.log("Received data:", { name, email, password, profileImage, rating, numOfRatings });
    
        // Check if user already exists
        const user = await User.findOne({ email });
        console.log("User exists:", user);
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password + PEPPER, 10);
        console.log("Hashed password:", hashedPassword);
            // Create new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                profileImage,
                rating,
                numOfRatings
            });
            console.log("New user object:", newUser);
            // Save user to database
            await newUser.save();
            console.log("User saved to DB");

              res.status(201).json({
                name: newUser.name,
                email: newUser.email,
                profileImage: newUser.profileImage,
                rating: newUser.rating,
                numOfRatings: newUser.numOfRatings,
                token:token(newUser._id)
            });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
    try {
      const {email,password} = req.body;
        console.log("Received login data:", { email, password });
          const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const valid = await bcrypt.compare(password + PEPPER, user.password)
        if (!valid)
            return res.status(401).json({ message: "Invalid email or password" });
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            rating: user.rating,
            numOfRatings: user.numOfRatings,
            token: token(user._id)
        }
        console.log("Returned Data: ", response);
        res.json(response);
        
      }catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
