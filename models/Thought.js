const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat');


// Reaction (Schema Only)

// reactionId - Use Mongoose's ObjectId data type, Default value is set to a new ObjectId

// reactionBody - String, Required,  280 character maximum

// createdAt - Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    } 
})


// Thought

// thoughtText - String, Required, Must be between 1 and 280 characters

// createdAt - Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query

// username (the user that created this thought) - String, Required

// reactions (These are like replies) - Array of nested documents created with the reactionSchema

// Schema Settings - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        length: [1, 280]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought