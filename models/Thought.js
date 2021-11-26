// Thought

// thoughtText - String, Required, Must be between 1 and 280 characters

// createdAt - Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query

// username (the user that created this thought) - String, Required

// reactions (These are like replies) - Array of nested documents created with the reactionSchema

// Schema Settings - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query

const { Schema, model } = require('mongoose')

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
        require: true,
        trim: true
    },
    reactions: [ReactionsSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
)



const Thought = model('Thought', ThoughtSchema)

module.exports = Thought