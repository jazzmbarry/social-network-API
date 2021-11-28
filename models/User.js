// User 

// username - String, Unique, Required, Trimmed

// email - String, Required, Unique, Must match a valid email Address

// thoughts - Array of _id values referencing the Thought model

// friends - Array of _id values referencing the User model (self-reference)

// Schema Settings - Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const { Schema, model } = require('mongoose')

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
)

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('User', UserSchema)

module.exports = User;