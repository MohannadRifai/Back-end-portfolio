import mongoose from "mongoose";

const projectsSchema = mongoose.Schema({
number:{
type: Number
},
title:{
type: String

},
image: {
    type: String 
},

description: {
    type: String
},
link:{
type: String
},

createdAt: {
    type: Date,
    default: new Date()
}
})

const projects = mongoose.model('projectsinfo', projectsSchema)

export default projects;