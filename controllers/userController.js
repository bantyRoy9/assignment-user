const User = require('./../modal/userModal')
const jwt = require('jsonwebtoken')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}
const createSendToken=(user,statusCode,res)=>{
    const token = signToken(user._id)
    console.log(token);
    const tokenOption = {
        expires: new Date(Date.now()+ process.env.cookie_expire*24*3600000),
        httpOnly:true
    }
    res.cookie("jwt", token, tokenOption);

    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}
exports.signUp = async(req,res,next)=>{
    const { email } = req.body
    try{
            const user = await User.findOne({email});
            
            if(!user){
                const newUser = await User.create(req.body);
                createSendToken(newUser,201,res);
                // return
            }else{
                createSendToken(user,200,res)

            }
    

    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}

exports.update =async(req, res,next)=>{
    console.log(req.params);
       console.log(req.body);
    // if(req.file) filterBody.photo = req.file.filename
    
    try{

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators:true
    })
    
     res.status(200).json({
         status:'success',
         data:{
             user: updatedUser
         }
     })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
 
}



exports.getAllUser = async(req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({
            status:'success',
            data:{
                users
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}