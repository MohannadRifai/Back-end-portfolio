import mongoose from "mongoose";
const {Schema, model} = mongoose;

const informationSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    number: {
        type: Number
    },
    link: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'information',
    timestamps: true
});

const information = model('information', informationSchema);
export default information;