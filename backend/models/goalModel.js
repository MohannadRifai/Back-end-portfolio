const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
//to know for each goal which user created it... the type is like that to take its object id 
//and the ref is to know which models does this object id is for which is the user(name of the model which is here the user)        
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',   
        },
        
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    
}, {
    timestamps: true,
}
)

module.exports = mongoose.model('Goal', goalSchema)