const mongoose= require('mongoose');

//Message Schema
const messageSchema= new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl:{

        type:String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false
    }
},{timestamps : true})

//conversation Schema
const conversationSchema = new mongoose.Schema(
    {
        sender : {
            type: mongoose.Schema.ObjectId,
            required : true,
            ref : 'User'
        },
        receiver : {
            type: mongoose.Schema.ObjectId,
            required : true,
            ref : 'User'
        },
        messages : [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Message'
            }
        ]
    },{timestamps:true });

    //converting the scema into a model for a more modular and structured approach
    const ConversationModel = mongoose.Model('Conversation',conversationSchema);
    const MessageModel = mongoose.Model('Message',messageSchema);

    //making object to export both the models
    module.exports = {
        MessageModel,
        ConversationModel
    }