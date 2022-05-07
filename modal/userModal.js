const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required: [true, 'Name is required'],
        validate: [validator.isEmail, 'please provide valid Email']
        
    },
    password:{
        type:String,
        required: [true, 'Name is required'],
        minlength:4        
    },
    // passwordconfirm:{
    //     type:String,
    //     required: [true, 'Name is required'],
    //     validate: {
    //         validator: function(el){
    //             return (el === this.password)
    //         },
    //         message:'password are not match'
    //     }

    // },
    name:{
        type:String,
        // required: [true, 'Name is required'],

    },
    birth:{
        type:Date,
        // required:[true, 'user Date Of Birth required']
    },

    phone:{
        type:Number,
        // required:true
    },
    education:{
        type:String,
        // required:true
    },
    speciality:String,
    company:String,
    address:{
        type:String,
        // required:true
    },
    pincode:{
        type:Number,
        // required:true,
        max:[6,'pincode should be less than 6'],
    },
    bio:{
        type:String,
        maxlength:[100,'should be less than 100']
    },
    photo:{
        type:String,
        default: 'default.jpg'
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordconfirm = undefined;
    next();
})

// userSchema.pre('save', function(next){
//     if(!this.isModified('password')){
//         return next();
//     }
//     this.passwordChangeAt = Date.now() - 1000;
//     next();
// })

// userSchema.pre(/^find/, function(next){
//     this.find({active :{ $ne : false}});
//     next();
// });

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changePasswordAfter = function(JWTTimeStamp){
   
    if(this.passwordChangeAt){
        const changeTimeStamp = parseInt(this.passwordChangeAt.getTime()/1000,10)

        // console.log(changeTimeStamp , JWTTimeStamp);
        return JWTTimeStamp < changeTimeStamp
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpire = Date.now() + 10*60*1000;
    // console.log( { resetToken} , this.passwordResetToken);
    return resetToken;
     
}

const User = mongoose.model('User', userSchema);

module.exports = User