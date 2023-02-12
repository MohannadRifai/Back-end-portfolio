import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please add a name"],
  },
  pwd: {
    type: String,
    required: [true, "Please add a password"],
    }
}, {
    
    timestamps:true
})



const User = mongoose.model('User',userSchema) 
export default User;