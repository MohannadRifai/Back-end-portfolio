import mongoose from "mongoose";

const quoteSchema = mongoose.Schema({

quote: {
    type: String 
},

createdAt: {
    type: Date,
    default: new Date()
}
})

const quote2 = mongoose.model('quote', quoteSchema)

export default quote2;