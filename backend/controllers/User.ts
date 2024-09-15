import { NextFunction, Request, Response } from "express";
import UsersModel from "../models/UserModel";
import jwt from 'jsonwebtoken';
import bcrypt from  'bcrypt';
import CustomError from "../middlware/ErrorHandler";

export const SignUp = async (req :Request, res: Response, next : NextFunction) => {

    try {
        const {name, email, password, confirmPassword } = req.body;
        if(password != confirmPassword) {
            throw new CustomError(400, 'Password and Confirm-Password is not matching');
        }

    const hashedPassword = await bcrypt.hash(password, 12);
    const new_user = await UsersModel.create({
        name : name,
        email : email,
        password : hashedPassword
    });

    const token = jwt.sign({_id : new_user._id }, 'secret123' as jwt.Secret, {
        expiresIn : '1min'
    });
    res.json({
        userid : new_user._id,
        token : token,
        message : "User created successfully",
        success : true
    });
    
    } catch (error) {
        next(error);
    }

}

export const Login = async (req : Request, res : Response, next : NextFunction) => {
    
    try {

        const {email, password} = req.body;
        const user = await UsersModel.findOne({ email });
        if(!user) {
            throw new CustomError(404, 'User not exsist');
        }
        else {

            const isPasswordValid = await bcrypt.compare(password, user.password as string); 
            if(!isPasswordValid){
                throw new CustomError(401, 'Password is incorrect');
            }
            else {

                const token = jwt.sign({_id : user._id}, 'secret123'as jwt.Secret, {
                    expiresIn : '1min'
                })

                res.json({
                    userid : user._id,
                    token : token,
                    message : "User successfully logged In.",
                    success : true
                });
            }
            
        }
        
    } catch (error) {
        next(error);
    }   
}