const mongoose = require( "mongoose" );

const userSchema= mongoose.Schema({
    username : {
        type:String,
        unique:true,
        require:true
    },
    email : {
        type: String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        unique:true,
        require:true
    },
    roles: {
        type: [String], 
        default: ['User'], 
      },
    profile:{
        name:{
            type:String,
        },
        profilepicture:{
            type:String
        },
        gender:{
            type:String
        }
    }
});


const User = mongoose.model("user",userSchema);

module.exports={
    User
}