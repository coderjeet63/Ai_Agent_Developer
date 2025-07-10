import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // 👈 make sure this path is correct for your project
import Project from '../models/project.model.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('🧪 JWT_SECRET:', process.env.JWT_SECRET);

export const authUser = async (req, res, next) => {
  try {
    // Get token from header or cookie
   const token =
  (req.cookies && req.cookies.token) ||
  (req.headers.authorization && req.headers.authorization.split(' ')[1]);

   console.log("Incoming Token:", token);



if (!token) {
  console.log('❌ No token found');
  return res.status(401).json({ error: 'Unauthorized User - Token Missing' });
}


    // Verify token
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log('Decoded token:', decoded);
  

    // Find user from DB (optional but recommended to check if user still exists)
    const user = await User.findOne({ email: decoded.email }).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized User - Not Found' });
    }

    // Attach user to request
    req.user = user;

    next(); // pass control to next middleware/controller
  } catch (err) {
    console.log('Auth Error:', err.message);
    res.status(401).json({ error: 'Unauthorized User - Invalid Token' });
  }
};
