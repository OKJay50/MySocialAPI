const mongoose = require('mongoose');

// Define the Reaction schema
const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280, // Adjust the maximum length as needed
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        // Customize the timestamp format as needed (e.g., using a date library)
        return new Date(timestamp).toLocaleDateString();
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Export the Reaction model
module.exports = mongoose.model('Reaction', reactionSchema);
