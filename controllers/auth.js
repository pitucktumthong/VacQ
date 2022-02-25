// controller/auth.js
const express = require('express');
const User = require('../models/User');
//const user = require('../models/User');

//Get token from model, create cookie and send response
const sendTokenResponse = (user,statusCode, res) =>{
    //Create Token
    const token = user.getSignedJwtToken();

    const options = {
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),httpOnly:true
    };

    if(process.env.NODE_ENV==='production'){
        option.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,token
    })
}

//@desc     Register new user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req,res,next)=>{
    //res.status(200).json({success:true});
    try{
        const {name, email, password, role} = req.body;
        const user= await User.create({
            name,
            email,
            password,
            role
        });
        //const token = user.getSignedJwtToken();
        //res.status(200).json({success:true,token});
        sendTokenResponse(user,200,res);
    }
    catch(err)
    {
        res.status(400).json({success:false});
        console.log(err.stack);    
    }
    
};

//@desc     login user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req,res,next) => {
    const {email,password} = req.body;
    // validate email and password
    if(!email || !password){
        return res.status(400).json({success:false,msg:'Please provide email and password'});
    }
    // Check for user
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).json({success:false,msg:'Invalid credential'});
    }

    // Check for password
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(401).json({success:false,msg:'Invalid credential'});
    }

    // Create Token
    //const token = user.getSignedJwtToken();
    //res.status(200).json({success:true,token});
    sendTokenResponse(user,200,res);
};

//@desc     Get current Logged in user
//@route    POST /api/v1/auth/me
//@access   Private
exports.getMe = async (req,res,next)=>{
    const user=await User.findById(req.user.id);
    // console.log(user);
    res.status(200).json({success:true, data: user});

};