import mongoose from "mongoose";

const certificatesSchema = mongoose.Schema({

image: {
    type: String 
},

createdAt: {
    type: Date,
    default: new Date()
}
})

const certificates = mongoose.model('certificatesinfo', certificatesSchema)

export default certificates;