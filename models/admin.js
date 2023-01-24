import mongoose from "mongoose";
const {Schema, model} = mongoose;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'admins',
    timestamps: true
});

const Admin = model('Admin', adminSchema);
export default Admin;