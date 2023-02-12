import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    },
}, {
    
    timestamps:true
})



const user = mongoose.model('User',userSchema) 
export default user;