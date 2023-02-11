import mongoose from "mongoose";

const aboutSchema = mongoose.Schema({
quote:{
type: String

},
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

const about = mongoose.model('aboutinfo', aboutSchema)

export default about;