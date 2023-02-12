import mongoose from "mongoose";

const skillsSchema = mongoose.Schema({

image: {
    type: String 
},
description: {
    type: String
},

createdAt: {
    type: Date,
    default: new Date()
}
})

const skills = mongoose.model('skillsinfo', skillsSchema)

export default skills;