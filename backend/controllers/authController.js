import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


// generate JWT token
const generateToken = (id) => 
      jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'7d'});

//register user

export const signup = async (req,res)=>{
      const {name, email, password} = req.body;

      const userExists  = await User.findOne({email});

      if(userExists){
            return res.status(400).json({
                 message:"User already exists"
            });
      };

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
            name,
            email,
            password:hashed
      });

      res.json({
           token:generateToken(user._id),
           user:{
                  _id:user._id,
                  name:user.name,
                  email:user.email
           }
      });

}

//login user

export const login  = async (req, res) => {
     const {email, password} = req.body;

     const user = await User.findOne({email});

     if(!user){
           return res.status(400).json({
                  message:"Invalid credentials"
           });
     };

     const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch){
           return res.status(400).json({
                  message:"Invalid credentials"
           });
     };

     res.json({
            token:generateToken(user._id),
            user:{
                   _id:user._id,
                   name:user.name,
                   email:user.email
            }
       });
}

//logout

export const logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};
