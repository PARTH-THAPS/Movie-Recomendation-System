import { User } from "../models/userModels.js";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "Invalid Data", success: false })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", success: false })

        }

        const isMatch = await bycryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password", success: false })

        }


        const tokenData = { id: user._id };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        return res.status(200)
            .cookie("token", token, {
                httpOnly: true
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true,user
            });


    }
    catch (err) { }

}


export const Logout = async(req,res)=>{
    return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({message:"User Logged out Sucessfully",success:true})
     
}



export const Register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(401).json({
                message: "Invalid Data",
                success: false
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({ message: "The email is already in Database", success: false })
        }

        const hashedPassword = await bycryptjs.hash(password, 16);

        await User.create({ fullname, email, password: hashedPassword })

        res.status(200).json({ message: "Account created Sucessfully", success: true })
    }
    catch (err) {
        console.log(err)
    }

}

