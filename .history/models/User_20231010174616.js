const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Thought',
        }
    ],

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
    ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;