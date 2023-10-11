const mongoose = require('mongoose');

// Define the Reaction schema
const reactionSchema = new mongoose.Schema(
  {
    reactionId: mongoose.Schema.Types.ObjectId,
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

// Define the Thought schema
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1, // Adjust the minimum length as needed
      maxLength: 280, // Adjust the maximum length as needed
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        // Customize the timestamp format as needed (e.g., using a date library)
        return new Date(timestamp).toLocaleDateString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of nested reactions
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual to calculate the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Export the Thought model
module.exports = mongoose.model('Thought', thoughtSchema);
